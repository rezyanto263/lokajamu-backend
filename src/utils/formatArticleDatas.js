const moment = require('moment');

const formatArticleDatas = (rows) => {
  return rows.map((row) => {
    const tags = row.tags ? row.tags.split(',') : [];

    const contents = row.contentTypes
      ? row.contentTypes.split('|').map((contentType, index) => ({
        type: contentType,
        text: row.contentTexts.split('|')[index]
      }))
      : [];

    return {
      id: row.id,
      title: row.title,
      tags: tags,
      imageUrl: row.imageUrl,
      contents: contents,
      createdAt: moment(row.createdAt).format('DD-MM-YYYY HH:mm:ss'),
      updatedAt: moment(row.updatedAt).format('DD-MM-YYYY HH:mm:ss')
    };
  });
};

module.exports = formatArticleDatas;