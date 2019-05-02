import material from '../../native-base-theme/variables/material';

/**
 * .bg-gradient-primary{
 *  background:linear-gradient(87deg,#c33764,#c34437)!important
 * }
 * .bg-gradient-atexmob{
 *  background:linear-gradient(87deg,#1dacd6,#1d5fd6)!important
 * }
 * 
 */

const general = {
  container: {
    flex: 1
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000',
    shadowOpacity: .1,
    shadowRadius: 1.2,
    elevation: 3
  },
}

export default general;