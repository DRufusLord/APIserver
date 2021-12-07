const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'ubuntu',
  host:'3.144.70.63',
  database: 'api',
  password: 'ubuntu',
  port: 5432,
})

module.exports.pool = pool;

pool.connect((err) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log('database connected!');
});

module.exports = {
  products: {
    getProducts: (req, res) => {

      pool.query('SELECT * FROM products order by product_id asc', (err, results) => {
        if(err) {
          throw err;
        }
        res.status(200).json(results.rows)
      })

    },

    getProductById: (req, res) => {

      const id = parseInt(req.params.product_id);

      let queryStr = `select \
                      json_build_object(\
                        'id', p.product_id,\
                        'name', p.name,\
                        'slogan', p.slogan,\
                        'description', p.description,\
                        'category', p.category,\
                        'default_price', p.default_price,\
                        'features', jsonb_agg(
                          json_build_object(\
                            'feature', f.feature,\
                            'value', f.value))\
                      )\
                      from products p\
                      left join features f on f.productId = p.product_id\
                      where p.product_id = $1\
                      group by p.product_id`;

      pool.query(queryStr, [id], (err, results) => {

        if(err) {
          throw err;
        }
        res.status(200).json(results.rows[0].json_build_object)

      })
    },



    getStyles: (req, res) => {

      const id = parseInt(req.params.product_id);
      // let queryStr = `select \
      //                 json_build_object(\
      //                   'style_id', s.id,\
      //                   'name', s.name,\
      //                   'original_price', s.original_price,\
      //                   'sale_price', s.sale_price,\
      //                   'default?', s.default_style,\
      //                   'photos', jsonb_agg(\
      //                     json_build_object(\
      //                       'phId', ph.id,
      //                       'url', ph.url,\
      //                       'thumbnail_url', ph.thumbnail_url)),\
      //                   'skus', jsonb_agg(\
      //                     json_build_object(\
      //                       'skuId', sk.id,
      //                       'size', sk.size,\
      //                       'quantity', sk.quantity))\
      //                 )\
      //                 from styles s\
      //                 inner join skus sk on sk.styleId = s.id\
      //                 left join photos ph on ph.styleId = s.id\
      //                 where s.productId = $1\
      //                 group by s.id`;
      let queryStr = `SELECT product_id,
      (SELECT array_to_json(array_agg(row_to_json(Results)))
        as results FROM

          (SELECT style_id, name, original_price, sale_price, default_style,

            (SELECT array_to_json(array_agg(row_to_json(Photos))) FROM
            (SELECT  thumbnail_url, url FROM photos WHERE photos.styleId = styles.style_id) Photos) photos,

            (SELECT json_object_agg(id, json_build_object('quantity', quantity, 'size', size)) FROM
            (SELECT * FROM skus WHERE skus.styleId = styles.style_id) s) skus

        FROM styles WHERE productId = $1) Results)
      FROM products WHERE product_id = $1; `;


      pool.query(queryStr,[id],(err, results) => {
        if(err) {
          throw err;
        }

        res.status(200).json(results.rows[0]);

      })

    },

    getRelated: (req, res) => {

      const id = parseInt(req.params.product_id);

      let queryStr = `select array(select related_id from related
                      where current_id = $1)`;

      pool.query(queryStr, [id], (err, results) => {

        if(err) {
          throw err;
        }
        res.status(200).json(results.rows[0].array)

      })
    },

  }
}


