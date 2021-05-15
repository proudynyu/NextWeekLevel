import 'package:DevQuiz/challenge/widgets/answer/answer_widget.dart';
import 'package:DevQuiz/core/app_text_styles.dart';
import 'package:flutter/material.dart';

class QuizWidget extends StatelessWidget {
  final String title;

  QuizWidget({Key? key, required this.title}) : super();
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Text(
            title, 
            style: AppTextStyles.heading
          ),
          SizedBox(height: 24),
          AnswerWidget(title: 'Compilador nativamente'),
          AnswerWidget(title: 'Compilador nativamente', isRight: true, isSelected: true),
          AnswerWidget(title: 'Compilador nativamente', isSelected: true),
          AnswerWidget(title: 'Compilador nativamente'),
        ],
      ),
    );
  }
}