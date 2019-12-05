import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import IndexReducer from './src/redux/reducer/index';
import IndexSaga from './src/redux/saga/index';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    return {
        ...createStore(IndexReducer,
            applyMiddleware(sagaMiddleware)),
        runSaga: sagaMiddleware.run(IndexSaga)
    };
};
export default configureStore;