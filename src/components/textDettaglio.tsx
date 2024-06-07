import {Typography} from '@mui/material';

type TextDettaglioProps = {
    description:string,
     value:string
}
const TextDettaglio : React.FC<TextDettaglioProps> = ({description, value}) =>{
  return(
    <div className="row mt-3">
      <div className="col d-flex flex-row-reverse">
        <Typography  variant="overline">{description}</Typography>
      </div>
      <div className="col d-flex flex-row m-auto">
        <Typography  variant="caption">{value}</Typography>
      </div>
    </div>
  );
};

export default TextDettaglio;