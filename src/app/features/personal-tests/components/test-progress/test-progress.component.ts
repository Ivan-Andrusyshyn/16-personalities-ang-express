import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-test-progress',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './test-progress.component.html',
  styleUrl: './test-progress.component.scss',
})
export class TestProgressComponent {
  @Input() progress = 0;
  @Input() current = 0;

  @Input() total = 0;
}
