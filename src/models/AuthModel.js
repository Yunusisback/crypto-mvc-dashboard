

const USERS_STORAGE_KEY = 'coinvault_users';

class AuthModel {
  static getUsers() {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  }

  static saveUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  static isEmailRegistered(email) {
    const users = this.getUsers();
    return users.some(user => user.email === email);
  }

  static registerUser(userData) {
    const users = this.getUsers();
    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      age: userData.age,
      password: userData.password,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  static loginUser(email, password) {
    const users = this.getUsers();
    return users.find(user => user.email === email && user.password === password);
  }
}

export default AuthModel;