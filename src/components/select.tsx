import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Props, PropsBasicSelect } from '../typescript/interface';

const BasicSelect: React.FC<PropsBasicSelect> = ({propsBasicSelect}) => {
  
  const {label,setValue,stateObj,items,keyLabel} = propsBasicSelect
 

  const handleChange = (event: SelectChangeEvent) => {
    setValue((prev) => ({...prev,...{[keyLabel]:event.target.value}}));
  };

  const valueSelect:any  = stateObj[keyLabel as keyof Props] 

  return (
    <Box  >
      <FormControl sx={{width:'90%'}} >
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={valueSelect}
          label={label}
          onChange={handleChange}
        >
          {items.length > 0 && items.map((el)=>{
            return <MenuItem key={Math.random()} value={el}>{el}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect
