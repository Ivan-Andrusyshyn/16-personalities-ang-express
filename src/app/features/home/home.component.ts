import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private meta: Meta,
    private title: Title,
  ) {
    this.title.setTitle('Тест 16 типів особистості MBTI — дізнайся свій тип');

    this.meta.updateTag({
      name: 'description',
      content:
        'Пройдіть безкоштовний тест 16 типів особистості (MBTI) та дізнайтесь свій психологічний тип. Інтроверт чи екстраверт, логік чи дипломат — дізнайся зараз.',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'MBTI тест, 16 типів особистості, психологічний тест, інтроверт екстраверт, визначити тип особистості',
    });

    this.meta.updateTag({
      property: 'og:title',
      content: 'Тест MBTI — 16 типів особистості',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'Безкоштовний тест 16 типів особистості. Дізнайся свій MBTI тип за кілька хвилин.',
    });
  }
}
