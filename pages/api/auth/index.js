export default function handler(req, res) {
  if (req.method === 'POST') {
    if (req.body.username === req.body.password) {
      res.status(200).json({
        id: "userid",
        name: req.body.username,
        type: 'normal user'
      })
    } else {
      res.status(200).json(null)
    }
  }
}
