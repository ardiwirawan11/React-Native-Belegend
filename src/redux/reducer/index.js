import { combineReducers } from 'redux'
import user from './userReducer'
import category from './CategoryReducer'
import athlete from './AthleteReducer'
import investor from './InvestorReducer'
import achieve from './AchieveReducer'
import scholarship from './ScholarshipReducer'
import detail from './DetailReducer'
import myapply from './MyapplyReducer'
import myscholarship from './MyscholarshipReducer'
import accepted from './AcceptedReducer'
import profile from './ProfileReducer'
import aachieve from './AachieveReducer'


const IndexReducer = combineReducers ({
user : user,
category: category,
athlete: athlete,
investor: investor,
achieve: achieve,
scholarship: scholarship,
detail: detail,
myapply: myapply,
myscholarship: myscholarship,
accepted: accepted,
profile: profile,
aachieve: aachieve

})
export default IndexReducer