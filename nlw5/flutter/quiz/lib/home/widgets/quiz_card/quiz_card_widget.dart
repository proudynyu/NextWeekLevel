import 'package:DevQuiz/core/app_colors.dart';
import 'package:DevQuiz/core/app_images.dart';
import 'package:DevQuiz/core/app_text_styles.dart';
import 'package:DevQuiz/shared/widgets/progress_indicator_widget.dart';
import 'package:flutter/material.dart';

// enum PossibleIcons {
//   Box,
//   Terminal,
//   Pc,
//   Integracao,
// }

// String describeEnum(Object enumEntry) { 
//   final String description = enumEntry.toString();
//   final int indexOfDot = description.indexOf('.');
//   assert(indexOfDot != -1 && indexOfDot < description.length - 1);  
//   return description.substring(indexOfDot + 1);
// }

// extension PossibleIconsExtension on PossibleIcons {
//   String get name => describeEnum(this);
//   String get iconName {
//     switch(this) {
//       case PossibleIcons.Box:
//        return AppImages.blocks;
//       case PossibleIcons.Terminal:
//        return AppImages.laptop;
//       case PossibleIcons.Integracao:
//        return AppImages.hierarchy;
//       case PossibleIcons.Pc:
//        return AppImages.laptop;
//     }
//   }
// }

class QuizCardWidget extends StatelessWidget {
  final String text;
  final String iconSelected;
  QuizCardWidget({
    Key? key,
    required this.text,
    required this.iconSelected
  }) : assert(["box", "terminal", "pc", "integracao"].contains(iconSelected)), super();

  final icons = {
    "box": AppImages.blocks,
    "terminal": AppImages.data,
    "pc": AppImages.laptop,
    "integracao": AppImages.hierarchy,
  };

  String get icon => icons[iconSelected]!;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: Border.fromBorderSide(
          BorderSide(color: AppColors.border)
        ),
        color: AppColors.white,
        borderRadius: BorderRadius.circular(10)
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 40,
              height: 40,
              child: Image.asset(icon),
            ),
            SizedBox(height: 24),
            Text(
              text,
              style: AppTextStyles.heading15,   
            ),
            SizedBox(height: 32),
            Row(children: [
              Expanded(
                flex: 1,
                child: Text("3 de 10", style: AppTextStyles.body11)
              ),
              Expanded(
                flex: 2,
                child: ProgressIndicatorWidget(value: 0.3),
              )
            ],)
          ]
        ),
      ),
    );
  }
}