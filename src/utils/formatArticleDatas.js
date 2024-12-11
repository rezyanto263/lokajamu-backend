const moment = require('moment');

const formatArticleDatas = (rows) => {
  return rows.map((row) => {
    const tags = row.tags ? row.tags.split(',') : [];

    const contents = row.contentDetails
      ? row.contentDetails.split('|').map((content) => {
        const [type, text] = content.split(':');
        return { type, text };
      })
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