let returnPromise = async(result) => {
    return result.then(result => { return result });
}

module.exports = { returnPromise };