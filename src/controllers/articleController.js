const Article = require('../models/articleModel');
const Content = require('../models/contentModel');
const Tag = require('../models/tagModel');
const bucket = require('../config/googleCloud');
const path = require('path');
const fs = require('fs');
const formatArticleDatas = require('../utils/formatArticleDatas');

const getArticleById = async (req, res) => {
  const articleId = req.params.id;

  try {
    const [articleResults] = await Article.getById(articleId);

    if (articleResults.length === 0) return res.status(404).json({ status: 'fail', message: 'Article not found' });

    const [article] = formatArticleDatas(articleResults);

    return res.json({
      status: 'success',
      data: {
        article: article
      }
    });
  } catch (err) {
    console.error(`Error occured: ${err.message}`);
    return res.status(500).json({ status: 'error', message: 'Can not get article data' });
  }
};

const searchAllArticles = async (req, res) => {
  const searchKeyword = req.query.search;

  try {
    const [articleResults] = searchKeyword ? await Article.search(searchKeyword) : await Article.getAll();
    const articles = formatArticleDatas(articleResults);

    return res.json({
      status: 'success',
      data: {
        articles: articles
      }
    });
  } catch (err) {
    console.error(`Error occured: ${err.message}`);
    return res.status(500).json({ status: 'error', message: 'Can not get articles data' });
  }
};

const addArticle = async (req, res) => {
  const { title, tags, contents } = req.body;
  const imageFile = req.file;
  const fileName = Date.now() + path.extname(imageFile.originalname);

  try {
    await bucket.upload(imageFile.path, {
      destination: `articles/${fileName}`,
      metadata: {
        contentType: imageFile.mimetype
      },
      predefinedAcl: 'publicRead'
    });
    fs.unlinkSync(imageFile.path);

    const imageUrl = `https://storage.googleapis.com/${bucket.name}/articles/${fileName}`;

    const [articleResults] = await Article.add(title, imageUrl);
    const articleId = articleResults.insertId;

    if (tags) {
      await Tag.addBatch(tags.map((tag) => [tag.tag, articleId, 'articles']));
    }

    await Content.addBatch(contents.map((c) => [articleId, c.type, c.text]));

    return res.status(201).json({
      status: 'success',
      message: 'Article added successfully',
      data: {
        articleId: articleId
      }
    });
  } catch (err) {
    console.error(`Error occured: ${err.message}`);
    return res.status(500).json({ status: 'error', message: 'Can not add article data' });
  }
};

const editArticle = async (req, res) => {
  const articleId = req.params.id;
  const imageFile = req.file;

  try {
    const [articleResults] = await Article.getById(articleId);
    const article = articleResults[0];
    const { title = article.title, tags, contents } = req.body;
    let { imageUrl = article.imageUrl } = req.body;

    if (!imageFile) {
      await Article.edit(title, imageUrl, articleId);
    } else {
      const fileName = Date.now() + path.extname(imageFile.originalname);

      const urlParts = new URL(imageUrl);
      const filePath = urlParts.pathname.replace(`/${bucket.name}/`, '');
      await bucket.file(filePath).delete();

      await bucket.upload(imageFile.path, {
        destination: `articles/${fileName}`,
        metadata: {
          contentType: imageFile.mimetype,
        },
        predefinedAcl: 'publicRead'
      });
      fs.unlinkSync(imageFile.path);

      imageUrl = `https://storage.googleapis.com/${bucket.name}/articles/${fileName}`;

      await Article.edit(title, imageUrl, articleId);
    }

    if (tags) {
      await Tag.deleteAll(articleId, 'articles');
      await Tag.addBatch(tags.map((tag) => [tag, articleId, 'articles']));
    }

    if (contents) {
      await Content.deleteAll(articleId);
      await Content.addBatch(contents.map((c) => [articleId, c.type, c.text]));
    }

    return res.json({
      status: 'success',
      message: 'Article edited successfully'
    });
  } catch (err) {
    console.error(`Error occured: ${err.message}`);
    return res.status(500).json({ status: 'error', message: 'Can not edit article data' });
  }
};

const deleteArticle = async (req, res) => {
  const articleId = req.params.id;

  try {
    let [articleResults] = await Article.getById(articleId);
    const isArticleIdExist = articleResults.length > 0;

    if (!isArticleIdExist) return res.status(404).json({ status: 'fail', message: 'Article not found' });

    const imageUrl = articleResults[0].imageUrl;

    const urlParts = new URL(imageUrl);
    const filePath = urlParts.pathname.replace(`/${bucket.name}/`, '');
    await bucket.file(filePath).delete();

    [articleResults] = await Article.delete(articleId);

    return res.json({
      status: 'success',
      message: 'Article deleted successfully'
    });
  } catch (err) {
    console.error(`Error occured: ${err.message}`);
    return res.status(500).json({ status: 'error', message: 'Can not delete article data' });
  }
};

module.exports = {
  addArticle,
  getArticleById,
  searchAllArticles,
  editArticle,
  deleteArticle
};