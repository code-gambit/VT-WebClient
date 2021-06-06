import React, {useReducer, useEffect, useContext, useState} from 'react'
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
const attributes = ["Today", "Yesterday", "Last Week", "Last Month", "Custom"];
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
    const [currentAttribute, setCurrentAttribute] = useState("");
    useEffect(()=>{
        if(state.startDate && state.endDate){
            if(state.endDate<state.startDate){
                dispatch({type: 'endDateChange', payload: undefined})
                fileDispatch(FileActionCreators.updateEndDate(undefined));
                toast.warning("Invalid Date Parameters")
                return;
            }
            fileDispatch(FileActionCreators.updateStartDate(getDate(state.startDate)));
            fileDispatch(FileActionCreators.updateEndDate(getDate(state.endDate)));
            fileDispatch(FileActionCreators.fileStateUpdateCurrentPage(1));
            fileDispatch(FileActionCreators.fileStateAddLastEKMap({}));
            FileActionCreators.loadFiles(fileDispatch,1,undefined,fileState.searchParam,getDate(state.startDate),getDate(state.endDate));
            toggle()
        }
    },[state])

    /**************************Use This Code for Apply Button*************************
    const applyFilter = () =>{
        if(state.startDate && state.endDate){
            if(state.endDate<state.startDate){
                dispatch({type: 'endDateChange', payload: undefined})
                fileDispatch(FileActionCreators.updateEndDate(undefined));
                toast.warning("Invalid Date Parameters");
                return;
            }
            fileDispatch(FileActionCreators.updateStartDate(getDate(state.startDate)));
            fileDispatch(FileActionCreators.updateEndDate(getDate(state.endDate)));
            fileDispatch(FileActionCreators.fileStateUpdateCurrentPage(1));
            fileDispatch(FileActionCreators.fileStateAddLastEKMap({}));
            FileActionCreators.loadFiles(fileDispatch,1,undefined,fileState.searchParam,getDate(state.startDate),getDate(state.endDate));
            //FileActionCreators.loadFiles(fileDispatch,1,undefined,fileState.searchParam,"2021-05-25","2021-05-30");
            toggle();
        }

        else if(!state.startDate){
            toast.warning("Select Start Date");
        }
        else if(!state.endDate){
            toast.warning("Select End Date");
        }
    }
    ***********************************************************************************/
    const handleFilter = (attribute) =>{
        if(attribute==attributes[0]){
            var start = JSON.stringify(new Date()).substring(1,11);
            var end = JSON.stringify(new Date()).substring(1,11);
            dispatch({type: 'startDateChange', payload: new Date()});
            dispatch({type: 'endDateChange', payload: new Date()});
            
        }
        else if(attribute==attributes[1]){
            var yesDate = new Date(new Date());
            yesDate.setDate(yesDate.getDate()-1);
            dispatch({type: 'startDateChange', payload: yesDate});
            dispatch({type: 'endDateChange', payload: yesDate});
        }
        else if(attribute==attributes[2]){
            var beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
            var beforeOneWeek2 = new Date(beforeOneWeek);
            var day = beforeOneWeek.getDay()
            var diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1)
            var lastMonday = new Date(beforeOneWeek.setDate(diffToMonday))
            var lastSunday = new Date(beforeOneWeek2.setDate(diffToMonday + 6));
            dispatch({type: 'startDateChange', payload: lastMonday});
            dispatch({type: 'endDateChange', payload: lastSunday});
        }
        else if(attribute==attributes[3]){
            var firstDate = new Date();
            firstDate.setDate(0);
            firstDate.setDate(1);
            var lastDate = new Date();
            lastDate.setDate(0);
            dispatch({type: 'startDateChange', payload: firstDate});
            dispatch({type: 'endDateChange', payload: lastDate});
            
        }
        else if(attribute==attributes[4]){
            setCurrentAttribute(attribute);
        }
    }
    return (
        <div>
            <div className="d-flex justify-content-around py-1">
                {attributes.map(attribute =>{
                    return(
                        <span className="badge badge-dark" type="button" onClick={()=>handleFilter(attribute)}>{attribute}</span>
                    )
                })}
            </div>
            <div>
                {currentAttribute==attributes[4]?
                    <div className="d-flex justify-content-between align-items-center row py-1">
                        <div id="startDate" className="col-12 col-sm-12 col-md-6 pt-2">
                            <span className="badge badge-secondary">
                                From
                            </span>
                            <DateSingleInput
                                onDateChange={data => dispatch({type: 'startDateChange', payload: data.date})}
                                onFocusChange={focusedInput => dispatch({type: 'startFocusChange', payload: focusedInput})}
                                date={state.startDate} // Date or null
                                showDatepicker={state.showStartDatepicker} // Boolean
                            />
                        </div>
                        {!state.showStartDatepicker?
                            <div id="endDate" className="col-12 col-sm-12 col-md-6 pt-2">
                                <span className="badge badge-secondary">
                                    To
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
                :
                    ""
                }
            </div>
            {/* <div className="p-1">
                <span className=" badge-pill badge-primary" type="button" onClick={()=>applyFilter()}>Apply</span>
            </div> */}
        </div>
    )
}
export default React.memo(FileDateFilter);