import 'package:flutter/material.dart';
import '../services/api_service.dart';
import 'login_screen.dart';

class SignupScreen extends StatefulWidget {
  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  bool loading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              children: [
                const Text("Create Account", style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
                const SizedBox(height: 20),
                TextField(controller: nameController, decoration: InputDecoration(labelText: "Name")),
                const SizedBox(height: 10),
                TextField(controller: emailController, decoration: InputDecoration(labelText: "Email")),
                const SizedBox(height: 10),
                TextField(controller: passwordController, decoration: InputDecoration(labelText: "Password"), obscureText: true),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () async {
                    setState(() => loading = true);
                    final success = await ApiService.signup(
                      nameController.text,
                      emailController.text,
                      passwordController.text,
                    );
                    setState(() => loading = false);
                    if (success) {
                      Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => LoginScreen()));
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Signup failed")));
                    }
                  },
                  child: loading ? CircularProgressIndicator(color: Colors.white) : Text("Sign Up"),
                ),
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text("Already have an account? Login"),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
