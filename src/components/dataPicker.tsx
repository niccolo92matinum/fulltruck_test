import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PropsDataPic } from '../typescript/interface';
import  dayjs from 'dayjs';

const DatePickerValue: React.FC<PropsDataPic> = ({propsDataPick}) => {
 
  const {label,setValue,keyLabel,disabled,value,error} = propsDataPick

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{width:'90%'}}
        label={label}
        format="DD-MMM-YYYY"
        disabled={disabled}
        value={dayjs(value)|| dayjs()}
        slotProps={{
          textField: {
            inputProps: {
              placeholder: 'dd-mm-yyyy',
            },
            error:error
          },
        }}
        onChange={(newValue:any) =>{
          let mese = newValue?.$M + 1
          let giorno = newValue?.$D
          if(mese < 10){
            mese = '0'+mese
          }
          if(giorno < 10){
            giorno = '0'+giorno
          }

          const time = `${newValue?.$y}-${mese}-${giorno}`
          return setValue((prev) => ({...prev,...{[keyLabel]:time}}))}
        } 
      />
    </LocalizationProvider>
  );
}

export default DatePickerValue
