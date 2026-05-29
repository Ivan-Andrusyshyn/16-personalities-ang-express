import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  signal,
} from '@angular/core';
import { NgClass } from '@angular/common';

// ==============
import { Question, Option } from '../../models/test.models';

@Component({
  selector: 'app-test-question',
  standalone: true,
  imports: [NgClass],
  templateUrl: './test-question.component.html',
  styleUrl: './test-question.component.scss',
})
export class TestQuestionComponent implements OnChanges {
  @Input() question!: Question;
  @Input() questionNumber = '';
  @Input() selected: string | null = null;
  @Output() answered = new EventEmitter<{
    questionId: number;
    answer: string;
  }>();

  entering = signal(false);
  selectedType = signal<string | null>(null);

  readonly letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['question']) {
      this.entering.set(true);
      this.selectedType.set(this.selected);
    }
    if (changes['selected']) {
      this.selectedType.set(this.selected);
    }
  }

  buildAnswerType(questionId: number, opt: Option): string {
    return opt.point + (opt.type ? '-' + opt.type : '');
  }

  select(opt: Option) {
    const answer = this.buildAnswerType(this.question.id, opt);

    this.selectedType.set(answer);
    this.answered.emit({ questionId: this.question.id, answer });
  }
}
