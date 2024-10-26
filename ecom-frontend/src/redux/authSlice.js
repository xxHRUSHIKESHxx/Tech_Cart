// Initial state
const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,  // Rehydrate isLoggedIn from localStorage
  user: JSON.parse(localStorage.getItem('user')) || null,  // Rehydrate user from localStorage
  isAdmin: localStorage.getItem('isAdmin') === 'true' || false,  // Rehydrate isAdmin from localStorage
};

// Action types
const LOGIN_REQUEST = 'LOGIN_REQUEST'; // Added action for login request
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGOUT = 'LOGOUT';
const UPDATE_USER_PROFILE_REQUEST = 'UPDATE_USER_PROFILE_REQUEST'; // New action type for profile update request
const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS'; // New action type for profile update success
const UPDATE_USER_PROFILE_FAIL = 'UPDATE_USER_PROFILE_FAIL'; // New action type for profile update failure

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null, // Clear any previous errors
      };
    case LOGIN_SUCCESS:
      // Store in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('isAdmin', action.payload.user.is_admin || false);

      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        isAdmin: action.payload.user.is_admin || false,
      };

    case LOGOUT:
      // Clear localStorage
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin');

      return {
        ...initialState,  // Reset to initial state
      };

    default:
      return state;
  }
};

// Action creators
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: { user },
});

export const loginFail = (error) => ({
  type: LOGIN_FAIL,
  payload: { error },
});

export const logout = () => ({
  type: LOGOUT,
});

export default authReducer;
