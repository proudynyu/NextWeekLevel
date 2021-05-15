import 'package:DevQuiz/core/app_colors.dart';
import 'package:DevQuiz/core/app_text_styles.dart';
import 'package:flutter/material.dart';

class AnswerWidget extends StatelessWidget {
  final String title;
  final bool isRight;
  final bool isSelected;

  AnswerWidget({
    Key? key, 
    required this.title,
    this.isRight = false,
    this.isSelected = false
  }) : super();

  Color get _selectedColorRight => isRight ? 
    AppColors.darkGreen : AppColors.darkRed;

  Color get _selectedBorderRight => isRight ? 
    AppColors.lightGreen : AppColors.lightRed;

  Color get _selectedColorCardRight => isRight ? 
    AppColors.lightGreen : AppColors.lightRed;

  Color get _selectedBorderCardRight => isRight ? 
    AppColors.green : AppColors.red;

  TextStyle get _selectedTextStyleRight => isRight ? 
    AppTextStyles.bodyDarkGreen : AppTextStyles.bodyDarkRed;

  IconData get _selectedIconRight => isRight ? 
    Icons.check : Icons.close;


  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      child: Container(
        padding: EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isSelected ? _selectedColorCardRight : AppColors.white,
          borderRadius: BorderRadius.circular(10),
          border: Border.fromBorderSide(BorderSide(
            color: isSelected ? _selectedBorderCardRight : AppColors.lightGrey
          ))
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              title, 
              style: isSelected ? _selectedTextStyleRight : AppTextStyles.body)
            ,
            Container(
              height: 24,
              width: 24,
              child: Icon(
                isSelected ? _selectedIconRight : Icons.check, 
                size: 16,
                color: Colors.white,
              ),
              decoration: BoxDecoration(
                color: isSelected ? _selectedColorRight : AppColors.white,
                borderRadius: BorderRadius.circular(50),
                border: Border.fromBorderSide(
                  BorderSide(
                    color: isSelected ? _selectedColorRight : AppColors.lightGrey
                    )
                  )
              ),
            )
          ],
        ),
      ),
    );
  }
}