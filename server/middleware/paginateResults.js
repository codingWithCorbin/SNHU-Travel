
// function to limit results taking in a database model
function paginate(dbModel){

    return async (req, res, next) => {

        const userInquiry = req.query.inquiry

        if (!userInquiry){

            return res.status(204)
        }

        // get current page and limit from client
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        // get amount of items starting at corrected index with the amount in limit
        const start = (page - 1) * limit
        const end = page * limit

        //set up object to hold query results
        const items = {}

        // check if at the end of results to determine any remianing
        if(end < await dbModel.countDocuments().exec()){

            //set up the next page with limit amount
            items.next = {

                page: page + 1,
                limit: limit
            }

        }

        //check if index is more than starting index of 0 to determine if any previous data
        if(start > 0){

            //set up previous results
            items.previous = {

                page: page - 1,
                limit: limit
            }
        }

        //  get results from query using index set up
        try {

            // try query
            items.results = await dbModel.find({$text: {$search: userInquiry}}).limit(limit).skip(start).exec()

            // create object for client response
            res.paginateResults = items

            
            next()

        }catch(error){

            //output error if no results found
            res.status(400).json({"message": "Error getting results."})

        }

    }

}

module.exports = paginate