const notFound = (req, res, next) => {
    return res.status(404).send("Route doesn't exist");
}

module.exports = notFound;