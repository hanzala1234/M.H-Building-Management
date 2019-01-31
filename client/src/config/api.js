var GlobalApi={};
if(process.env.REACT_APP_PHASE==='production'){
    GlobalApi = {
        memberApi: `http://${process.env.REACT_APP_MEMBER_SVC}/`,
        announcementApi:`http://${process.env.REACT_APP_ANNOUNCEMENT_SVC}/`,
        messageApi: `http://${process.env.REACT_APP_MESSAGE_SVC}/`,
        budgetApi: `http://${process.env.REACT_APP_ANNOUNCEMENT_SVC}/`
    }
}
else{
 GlobalApi = {
    memberApi: 'http://localhost:8080/',
    announcementApi:'http://localhost:8030/',
    messageApi: 'http://localhost:8020/',
    budgetApi: 'http://localhost:8050/'
}
}


export default GlobalApi;