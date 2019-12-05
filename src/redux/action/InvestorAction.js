import { REQUEST_INVESTOR_DATA } from '../type/InvestorType'
export const getInvestor = (data) => {
    return {
        type: REQUEST_INVESTOR_DATA,
        token: data
    }
}