import { Dayjs } from 'dayjs';
export interface Props {
    aggregateBy: 'day' | 'week' | 'month'|'',
    timeTarget: 'pickup date' | 'created at'|'',
    startDate:Dayjs | null | string ,
    endDate: Dayjs | null | string 
  }




export interface PropsBasicSelect{
    propsBasicSelect:{
        label:string,
        keyLabel:string,
        setValue:React.Dispatch<React.SetStateAction<Props>>,
        stateObj:Props,
        items:string[]
    }
} 

export interface PropsDataPic{
    propsDataPick:{
        label:string,
        keyLabel:string,
        setValue:React.Dispatch<React.SetStateAction<Props>>, 
        disabled:boolean,
        value:Dayjs|null|string,
        error:boolean
    }
}



export interface DataTable{
        active_carrier: number,
        active_client: number,
        aggregate_date: string,
        assigned_count: number,
        new_carriers: number,
        new_clients: number,
        order_count: number,
        order_per_period: number,
        details:[{
            margin_abs: number,
            margin_abs_per_order: number,
            margin_perc: number,
            revenue: number,
            revenue_assigned: number,
            revenue_per_order: number
        }]      
}

export interface DataTableFetch {
        active_carrier: number,
        active_client: number,
        aggregate_date: string,
        assigned_count: number,
        new_carriers: number,
        new_clients: number,
        order_count: number,
        order_per_period: number,
         margin_abs: number,
        margin_abs_per_order: number,
        margin_perc: number,
        revenue: number,
        revenue_assigned: number,
         revenue_per_order: number
}

export interface MainDataFetch{
    data_table:DataTableFetch[],
    histograms:{
        time_margin_perc: {
            data: {
                date: string,
                margin_perc: number
            }[]
        },
        time_order_count: {
            data:{
                date: string,
                order_count: number
            }[]  
        },
        time_revenue: {
            data: {
                date: string,
                margin_abs: number,
                revenue: number
            }[],   
        }
    },
    scalars:Scalars,
    kpis:{
        carrier:{[key: string]:Carrier},
        client:{[key: string]:Client}
    }
}

export interface MainData{
    data_table:DataTable[],
    histograms:{
        time_margin_perc: {
            data: {
                date: string,
                margin_perc: number
            }[]
        },
        time_order_count: {
            data:{
                date: string,
                order_count: number
            }[]  
        },
        time_revenue: {
            data: {
                date: string,
                margin_abs: number,
                revenue: number
            }[],   
        }
    },
    scalars:Scalars,
    kpis:{
        carrier:{[key: string]:Carrier},
        client:{[key: string]:Client}
    }
}

export type Carrier = {
        label: string,
        margin_abs: number,
        margin_abs_per_order: number,
        margin_abs_perc_on_tot: number,
        margin_perc: number,
        order_count: 1,
        order_count_perc_on_tot: number,
        revenue: number,
        revenue_per_order: number,
        revenue_perc_on_tot: number
} 
export type Client = {
        label: string,
        margin_abs: number,
        margin_abs_per_order: number,
        margin_abs_perc_on_tot: number,
        margin_perc: number,
        order_count: number,
        order_count_perc_on_tot: number,
        revenue: number,
        revenue_per_order: number,
        revenue_perc_on_tot: number
}

export type Scalars = {
    active_carriers: number,
    active_clients: number,
    average_margin_perc: number,
    avg_order_margin_abs: number,
    avg_order_revenue: number,
    new_carriers: number,
    new_clients: number,
    total_assigned_count: number,
    total_margin_abs: number,
    total_order_count: number,
    total_revenue: number
}

export interface TrendPageProps{
    data:Scalars,
    gridData:{
        carrier:{[key: string]:Carrier},
        client:{[key: string]:Client}
    }
}

export interface DataTableProps{
    data:DataTable[],
    headerNames:string[],
    showedData:DataTable[],
    setShowedData:React.Dispatch<React.SetStateAction<DataTable[]>>
}

export interface HomePageProps{
    data:MainData,
    loadingData:boolean,
    showedData:DataTable[]
    setShowedData:React.Dispatch<React.SetStateAction<DataTable[]>>,
    getData:(el:Props)=>void,
    filters:Props,
     setFilters:React.Dispatch<React.SetStateAction<Props>>
}

export interface HistogramsPageProps{
   data:{time_margin_perc: {
            data: TimeMarginPerc[]
        },
        time_order_count: {
            data: TimeOrderCount[]  
        },
        time_revenue: {
            data: TimeRevenue[],   
        }}
    
}

export interface LinearChartProps{
    data:{
        data: TimeRevenue[],   
    }
}

export interface BarChartOrderCountProps{
        data: {data:TimeOrderCount[]} | {data:TimeMarginPerc[]},
        timeArray:string[],
        xArray:number[]|string[],
        label:string  
}

export type TimeOrderCount = {
        date: string,
        order_count: number
}

export type TimeMarginPerc ={
    date: string,
    margin_perc: number
}


export type TimeRevenue = {
    date: string,
    margin_abs: number,
    revenue: number
    }

export interface CustommizedTableProps{
    elements:{[key: string]:Carrier}|{[key: string]:Client},
    ownerTable:string
}

export interface DetailsPageProps{
       data:{carrier:{[key: string]:Carrier},
            client:{[key: string]:Client}
}
}


