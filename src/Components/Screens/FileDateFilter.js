import React, {useReducer, useEffect, useContext} from 'react'
import {DateSingleInput} from '@datepicker-react/styled'
import { FileContext } from '../../Context/Contexts/FileContext';
import * as FileActionCreators from '../../Context/ActionCreators/FileActionCreator';
import { toast } from 'react-toastify';
const initialState = {
    startDate: undefined,
    endDate: undefined,
    showStartDatepicker: false,
    showEndDatepicker: false
}

function reducer(state, action) {
    switch (action.type) {
        case 'startFocusChange':
            return {...state, showStartDatepicker: action.payload}
        case 'startDateChange':
            return {...state, startDate: action.payload, showStartDatepicker: false }
        case 'endFocusChange' :
            return {...state, showEndDatepicker: action.payload}
        case 'endDateChange' :
            return {...state,  endDate: action.payload, showEndDatepicker: false};
        default:
            throw new Error()
    }
}

const getDate = (dateString) =>{
    var year = dateString.getFullYear();
    var month = dateString.getMonth()+1;
    var date = dateString.getDate();
    if(month<10){
        month="0"+month;
    }
    if(date<10){
        date="0"+date;
    }
    var returnRes = year+"-"+month+"-"+date;
    return returnRes;
}

function FileDateFilter({toggle}) {
    const [state, dispatch] = useReducer(reducer,initialState)
    const {fileState, fileDispatch} = useContext(FileContext);
    useEffect(()=>{
        if(state.startDate){
            fileDispatch(FileActionCreators.updateStartDate(getDate(state.startDate)))
        }
        if(state.endDate){
            fileDispatch(FileActionCreators.updateEndDate(getDate(state.endDate)));
        }
        if(state.startDate && state.endDate){
            if(state.endDate<=state.startDate){
                dispatch({type: 'endDateChange', payload: undefined})
                fileDispatch(FileActionCreators.updateEndDate(undefined));
                toast.warning("Invalid Date Parameters")
                return;
            }
            fileDispatch(FileActionCreators.fileStateUpdateCurrentPage(1));
            fileDispatch(FileActionCreators.fileStateAddLastEKMap({}));
            FileActionCreators.loadFiles(fileDispatch,1,undefined,fileState.searchParam,state.startDate,state.endDate);
            toggle()
        }
    },[state])
    return (
        <div className="d-flex justify-content-between align-items-center row">
            <div id="startDate" className="col-12 col-sm-12 col-md-6 pt-2">
                <span className="badge badge-secondary">
                    Start Date
                </span>
                <DateSingleInput
                    onDateChange={data => dispatch({type: 'startDateChange', payload: data.date})}
                    onFocusChange={focusedInput => dispatch({type: 'startFocusChange', payload: focusedInput})}
                    date={state.startDate} // Date or null
                    showDatepicker={state.showStartDatepicker} // Boolean
                />
            </div>
            {/* <span className="px-1 pt-3">
                <i class="fa fa-exchange"></i>
            </span> */}
            {!state.showStartDatepicker?
                <div id="endDate" className="col-12 col-sm-12 col-md-6 pt-2">
                    <span className="badge badge-secondary">
                        End Date
                    </span>
                    <DateSingleInput
                        onDateChange={data => dispatch({type: 'endDateChange', payload: data.date})}
                        onFocusChange={focusedInput => dispatch({type: 'endFocusChange', payload: focusedInput})}
                        date={state.endDate}
                        showDatepicker={state.showEndDatepicker}
                    />
                </div>
            :
                ""
            }
        
        </div>
        
    )
}
export default FileDateFilter