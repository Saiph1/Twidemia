export default async function handler(req, res) {
  const { body } = req;
  res.json(body);
}
