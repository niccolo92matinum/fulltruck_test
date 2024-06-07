import { useRef } from 'react'
import json1 from './json1.json'
import json2 from './json2.json'
import { Props } from '../typescript/interface'



/**
 * Custom hook for fetching statistics data.
 * @returns An object containing the `fetchStatistics` function.
 */
const useStatistics = () => {
  const toggleRef = useRef(false)

  /**
   * Fetches statistics data based on the provided props.
   * This function has a delay to simulate a slow network call.
   * @param props - The props object containing the necessary parameters for fetching statistics.
   * @returns A promise that resolves to the fetched statistics data.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchStatistics = (_: Props) => {
    toggleRef.current = !toggleRef.current
    return new Promise((resolve) => {
      const delay = 2000 //Math.random() * 3000 + 500
      setTimeout(() => {

        const json = toggleRef.current ? json1 : json2
   
        let dataTableFiltered = {}
        if(_.timeTarget === "pickup date" ){
     
          dataTableFiltered = json.data_table.filter((singleObj)=>{
            if(typeof(_.startDate) === 'string' && typeof(_.endDate) === 'string'){
              if(new Date(singleObj.aggregate_date) >= new Date(_.startDate)  && new Date(singleObj.aggregate_date) <= new Date(_.endDate)){
                return singleObj
              }
            } 
          })
          
        }else if(_.timeTarget ===  "created at"){
          dataTableFiltered = json.data_table.filter((singleObj)=>{
            if(_.startDate === singleObj.aggregate_date.split('T')[0]){
              return singleObj
            }
          })
        }else{
          dataTableFiltered = json.data_table
        }
        const result = {...json,...{data_table:dataTableFiltered}}
       
        resolve(result)
        
        
      }, delay)
    })
  }

  return { fetchStatistics }
}

export default useStatistics
