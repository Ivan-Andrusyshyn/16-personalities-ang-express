// src/app/features/test/components/result/test-result.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

// ======================
import { TestResults } from '../../models/test.models';
@Component({
  selector: 'app-test-result',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './test-result.component.html',
  styleUrl: './test-result.component.scss',
})
export class TestResultComponent {
  @Input() result!: TestResults;
  @Output() onShare = new EventEmitter<void>();
  @Output() onRestart = new EventEmitter<void>();
}
