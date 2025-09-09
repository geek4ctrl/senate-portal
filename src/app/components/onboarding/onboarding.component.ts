import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  targetSelector: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: string;
  isOptional?: boolean;
}

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit, OnDestroy {
  @ViewChild('onboardingOverlay') onboardingOverlay!: ElementRef;

  isVisible = false;
  currentStepIndex = 0;
  currentStep: OnboardingStep | null = null;
  totalSteps = 0;

  steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'onboarding.welcome.title',
      description: 'onboarding.welcome.description',
      targetSelector: '.app-title',
      position: 'bottom'
    },
    {
      id: 'language',
      title: 'onboarding.language.title',
      description: 'onboarding.language.description',
      targetSelector: '.language-selector',
      position: 'bottom',
      action: 'onboarding.language.action'
    },
    {
      id: 'navigation',
      title: 'onboarding.navigation.title',
      description: 'onboarding.navigation.description',
      targetSelector: '.nav-tabs',
      position: 'bottom'
    },
    {
      id: 'map',
      title: 'onboarding.map.title',
      description: 'onboarding.map.description',
      targetSelector: '.nav-tab[data-tab="map"]',
      position: 'bottom',
      action: 'onboarding.map.action'
    },
    {
      id: 'constitution',
      title: 'onboarding.constitution.title',
      description: 'onboarding.constitution.description',
      targetSelector: '.nav-tab[data-tab="constitution"]',
      position: 'bottom',
      action: 'onboarding.constitution.action'
    },
    {
      id: 'senators',
      title: 'onboarding.senators.title',
      description: 'onboarding.senators.description',
      targetSelector: '.nav-senators',
      position: 'left',
      isOptional: true
    },
    {
      id: 'news',
      title: 'onboarding.news.title',
      description: 'onboarding.news.description',
      targetSelector: '.nav-tab[data-tab="news"]',
      position: 'bottom',
      action: 'onboarding.news.action'
    },
    {
      id: 'feedback',
      title: 'onboarding.feedback.title',
      description: 'onboarding.feedback.description',
      targetSelector: '.poll-tab',
      position: 'bottom',
      action: 'onboarding.feedback.action'
    }
  ];

  constructor(private translationService: TranslationService) {
    this.totalSteps = this.steps.length;
  }

  ngOnInit() {
    // Check if user has completed onboarding before
    if (!this.hasCompletedOnboarding()) {
      setTimeout(() => this.startOnboarding(), 1500); // Start after initial page load
    }
  }

  ngOnDestroy() {
    this.hideOnboarding();
  }

  startOnboarding() {
    this.isVisible = true;
    this.currentStepIndex = 0;
    this.showStep(0);
    document.body.style.overflow = 'hidden'; // Prevent scrolling during onboarding
  }

  showStep(stepIndex: number) {
    if (stepIndex < 0 || stepIndex >= this.steps.length) return;

    this.currentStepIndex = stepIndex;
    this.currentStep = this.steps[stepIndex];

    // Remove previous highlights
    this.clearHighlights();

    // Highlight target element
    this.highlightElement(this.currentStep.targetSelector);

    // Position tooltip
    this.positionTooltip();
  }

  nextStep() {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.showStep(this.currentStepIndex + 1);
    } else {
      this.completeOnboarding();
    }
  }

  previousStep() {
    if (this.currentStepIndex > 0) {
      this.showStep(this.currentStepIndex - 1);
    }
  }

  skipOnboarding() {
    this.completeOnboarding();
  }

  completeOnboarding() {
    this.markOnboardingComplete();
    this.hideOnboarding();
  }

  hideOnboarding() {
    this.isVisible = false;
    this.clearHighlights();
    document.body.style.overflow = ''; // Restore scrolling
  }

  private highlightElement(selector: string) {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.classList.add('onboarding-highlight');
      element.style.zIndex = '10001';
      element.style.position = 'relative';

      // Scroll element into view if needed
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }

  private clearHighlights() {
    const highlightedElements = document.querySelectorAll('.onboarding-highlight');
    highlightedElements.forEach((element: Element) => {
      const htmlElement = element as HTMLElement;
      htmlElement.classList.remove('onboarding-highlight');
      htmlElement.style.zIndex = '';
      htmlElement.style.position = '';
    });
  }

  private positionTooltip() {
    if (!this.currentStep || !this.onboardingOverlay) return;

    setTimeout(() => {
      const targetElement = document.querySelector(this.currentStep?.targetSelector || '') as HTMLElement;
      const tooltip = this.onboardingOverlay.nativeElement.querySelector('.onboarding-tooltip') as HTMLElement;

      if (targetElement && tooltip) {
        const targetRect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        let top = 0;
        let left = 0;

        switch (this.currentStep?.position) {
          case 'bottom':
            top = targetRect.bottom + 10;
            left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
            break;
          case 'top':
            top = targetRect.top - tooltipRect.height - 10;
            left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
            break;
          case 'left':
            top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
            left = targetRect.left - tooltipRect.width - 10;
            break;
          case 'right':
            top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
            left = targetRect.right + 10;
            break;
          case 'center':
          default:
            top = window.innerHeight / 2 - tooltipRect.height / 2;
            left = window.innerWidth / 2 - tooltipRect.width / 2;
            break;
        }

        // Ensure tooltip stays within viewport
        top = Math.max(10, Math.min(top, window.innerHeight - tooltipRect.height - 10));
        left = Math.max(10, Math.min(left, window.innerWidth - tooltipRect.width - 10));

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
      }
    }, 100);
  }

  private hasCompletedOnboarding(): boolean {
    return localStorage.getItem('senate-portal-onboarding-completed') === 'true';
  }

  private markOnboardingComplete() {
    localStorage.setItem('senate-portal-onboarding-completed', 'true');
    localStorage.setItem('senate-portal-onboarding-date', new Date().toISOString());
  }

  // Public method to reset onboarding (for settings menu)
  resetOnboarding() {
    localStorage.removeItem('senate-portal-onboarding-completed');
    localStorage.removeItem('senate-portal-onboarding-date');
    this.startOnboarding();
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  get progressPercentage(): number {
    return ((this.currentStepIndex + 1) / this.totalSteps) * 100;
  }

  get isFirstStep(): boolean {
    return this.currentStepIndex === 0;
  }

  get isLastStep(): boolean {
    return this.currentStepIndex === this.totalSteps - 1;
  }
}
