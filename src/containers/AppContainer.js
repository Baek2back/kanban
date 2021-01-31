import App from '../components/App';
import { connect, bindActionCreators } from '../redux';
import { increase, decrease } from '../modules/counter';

const mapStateToProps = (state) => ({
  number: state.counter.number
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ increase, decrease }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
