const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'ubuntu',
  host:'172.31.33.180',
  database: 'api',
  password: 'ubuntu',
  port: 5432,
})

// const pool = new Pool({
//   user: 'rufus',
//   host:'localhost',
//   database: 'api',
//   password: 'password',
//   port: 5432,
// });

pool.connect((err) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log('database connected!');
});

module.exports = {
  products: {
    getProducts: (req, res) => {

      let {offset, limit} = req.query;
      if(!offset) offset = 0;
      if(!limit) limit = 10;
      //if limit is 10, return 10 entries;
      //if offset is 0, return entries starting from row 1;
      pool.query('SELECT * FROM products order by product_id asc LIMIT $1 OFFSET $2 ',[limit, offset],(err, results) => {
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


