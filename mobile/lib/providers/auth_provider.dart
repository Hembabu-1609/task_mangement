import 'package:flutter/material.dart';
import '../services/api_service.dart';

class AuthProvider with ChangeNotifier {
  bool _isAuthenticated = false;
  bool get isAuthenticated => _isAuthenticated;

  Future<bool> login(String email, String password) async {
    try {
      final token = await ApiService.login(email, password);
      if (token != null) {
        _isAuthenticated = true;
        notifyListeners();
        return true;
      } else {
        _isAuthenticated = false;
        return false;
      }
    } catch (e) {
      print("Login error: $e");
      return false;
    }
  }

  Future<bool> signup(String name, String email, String password) async {
    try {
      final success = await ApiService.signup(name, email, password);
      return success;
    } catch (e) {
      print("Signup error: $e");
      return false;
    }
  }

  
  void logout() {
    _isAuthenticated = false;
    notifyListeners();
  }
}
