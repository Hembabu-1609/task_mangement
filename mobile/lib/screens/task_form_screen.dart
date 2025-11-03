import 'package:flutter/material.dart';
import '../services/api_service.dart';

class TaskFormScreen extends StatefulWidget {
  final VoidCallback onSaved;
  const TaskFormScreen({required this.onSaved});

  @override
  State<TaskFormScreen> createState() => _TaskFormScreenState();
}

class _TaskFormScreenState extends State<TaskFormScreen> {
  final titleController = TextEditingController();
  final descController = TextEditingController();
  String status = 'Pending';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Add Task")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            TextField(controller: titleController, decoration: InputDecoration(labelText: "Title")),
            const SizedBox(height: 10),
            TextField(controller: descController, decoration: InputDecoration(labelText: "Description")),
            const SizedBox(height: 10),
            DropdownButtonFormField(
              value: status,
              items: ["Pending", "In Progress", "Done"].map((s) => DropdownMenuItem(value: s, child: Text(s))).toList(),
              onChanged: (v) => setState(() => status = v!),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () async {
                await ApiService.addTask({
                  "title": titleController.text,
                  "description": descController.text,
                  "status": status
                });
                widget.onSaved();
                Navigator.pop(context);
              },
              child: const Text("Save Task"),
            ),
          ],
        ),
      ),
    );
  }
}
