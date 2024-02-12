class Post {

    id : number;
    title : string;
    body : string;
    date : Date;
    img_url : string;
    posted_by : string;

    constructor(id : number, title : string, body : string, date : Date , img_url : string, posted_by : string ) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.date = date;
        this.img_url = img_url;
        this.posted_by = posted_by;

    }
}

export default Post

// ----------------------------- //
// to create POST in postman use:
// {
//     "title": "iii",
//     "body" : "kjhgf",
//     "date" : "01-01-2020",
//     "image_url":"-------------------",
//     "posted_by": "jgfjgfjc"
// }