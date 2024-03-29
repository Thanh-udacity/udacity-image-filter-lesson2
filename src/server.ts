import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import fs from 'fs';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/filteredimage", async (req, res) => {
    let { image_url } = req.query;

    // 1. validate the image_url query
    if (!image_url) {
      return res.status(400).send(`Image URL is required`);
    }

    // 2. call filterImageFromURL(image_url) to filter the image
    // const image_path = await filterImageFromURL(image_url);
/*
    try {
    // 2. call filterImageFromURL(image_url) to filter the image
    const image_path = await filterImageFromURL(image_url);
    // 3. send the resulting file in the response
    res.status(200).sendFile(image_path,) ;
    } catch (err) {
      res.status(400).send(`Not able to process the image, Make sure image url is correct`);
    }
    // Deleting the used image file.
    deleteLocalFiles([image_path])
  });
*/
  try {
    const filteredpath = await filterImageFromURL(image_url)

    await res.status(200).sendFile(filteredpath, {}, (err) => {
      if (err) { return res.status(400).send(`Not able to process the image`); }
      // Deleting the used image file.
      deleteLocalFiles([filteredpath])
    })
  } catch (err) {
    res.status(400).send(`Not able to process the image, Make sure image url is correct`);
  }
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();