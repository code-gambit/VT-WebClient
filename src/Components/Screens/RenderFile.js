import { Card, Button, CardTitle, CardText, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import date from "date-and-time"

const RenderFile = (file) => {
    const fileId=file.SK.substring(5)
    var now=date.parse(fileId,'YYYY-MM-DD-hh-mm-ss');
    now=date.format(now, 'ddd, MMM DD, YYYY H:mm');
    return(
        <Col sm="6" className="p-2" key={file.SK}>
            <Card body>
                <div className="col-12">
                    <div className="float-left">
                        <CardTitle tag="h5">{file.LS1_SK}</CardTitle>
                    </div>
                    <div className="float-right">
                        <span className="rounded-pill primary-text mx-1 col-3 file-type-badge">{file.f_type}</span>
                        <span className="rounded-pill primary-text mx-1 col-3 file-size-badge">{file.size} MB</span>
                    </div>
                </div>
                <div className="col-12">
                    <CardText>Created at: {now}</CardText>
                    <Link to={`/file/${fileId}`} className="text-decoration-none">
                        <Button>Details</Button>
                    </Link>
                </div>
            </Card>
        </Col>
    )
}
 
export default RenderFile;