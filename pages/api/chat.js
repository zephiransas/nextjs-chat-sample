export default function handler(req, res) {
  res.status(200).json({ "response" : `message=${req.body.message}` })
}