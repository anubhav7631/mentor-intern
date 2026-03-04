# mentor-intern
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interface to define the shape of each feature card
interface Feature {
  icon: string;
  title: string;
  description: string;
}

// Interface to define each stat displayed in the impact section
interface Stat {
  value: string;
  label: string;
  suffix: string;
}

// Interface for the recycling steps section
interface Step {
  number: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-landing',           // HTML tag used to embed this component
  standalone: true,                  // No need for NgModule; works independently
  imports: [CommonModule],           // Import CommonModule for directives like *ngFor, *ngIf
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, AfterViewInit {

  // ─── NAV ────────────────────────────────────────────────────────────────────
  navLinks: string[] = ['Home', 'About', 'Services', 'Impact', 'Contact'];
  menuOpen = false;   // Tracks mobile hamburger menu state

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  // ─── FEATURES ───────────────────────────────────────────────────────────────
  // Data-driven approach: template loops over this array with *ngFor
  features: Feature[] = [
    {
      icon: '♻️',
      title: 'Smart Collection',
      description: 'Schedule doorstep pickups for your old electronics. We handle logistics so you don\'t have to.'
    },
    {
      icon: '🔬',
      title: 'Safe Dismantling',
      description: 'Certified technicians dismantle devices safely, preventing hazardous material leaks.'
    },
    {
      icon: '🌱',
      title: 'Material Recovery',
      description: 'We recover gold, copper & rare earth metals from your old devices for reuse.'
    },
    {
      icon: '📊',
      title: 'Impact Tracking',
      description: 'Get a personal impact report showing how much CO₂ and waste you\'ve saved.'
    },
    {
      icon: '🏢',
      title: 'Corporate Solutions',
      description: 'Bulk e-waste disposal for businesses with compliance certificates included.'
    },
    {
      icon: '🛡️',
      title: 'Data Security',
      description: 'Certified data destruction before recycling — your privacy is guaranteed.'
    }
  ];

  // ─── STATS ──────────────────────────────────────────────────────────────────
  stats: Stat[] = [
    { value: '12', suffix: 'K+', label: 'Devices Recycled' },
    { value: '450', suffix: 'T', label: 'CO₂ Prevented' },
    { value: '98', suffix: '%', label: 'Recovery Rate' },
    { value: '3', suffix: 'K+', label: 'Happy Users' }
  ];

  // ─── STEPS ──────────────────────────────────────────────────────────────────
  steps: Step[] = [
    { number: '01', title: 'Register & Request', description: 'Sign up and schedule a free doorstep pickup through our app or website.' },
    { number: '02', title: 'We Collect', description: 'Our certified agents collect your e-waste from your doorstep at no cost.' },
    { number: '03', title: 'Process & Recover', description: 'Devices are dismantled in certified facilities; materials are recovered responsibly.' },
    { number: '04', title: 'Track Your Impact', description: 'Receive a certificate and dashboard showing your environmental contribution.' }
  ];

  // ─── LIFECYCLE ──────────────────────────────────────────────────────────────

  ngOnInit(): void {
    // Component initialization logic (e.g., fetch API data here)
    console.log('LandingComponent initialized');
  }

  ngAfterViewInit(): void {
    // After DOM renders, set up IntersectionObserver for scroll animations
    this.initScrollAnimations();
  }

  // Uses the Intersection Observer API to trigger fade-in animations
  // when elements with class 'animate-on-scroll' enter the viewport
  private initScrollAnimations(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');  // CSS handles the actual animation
          }
        });
      },
      { threshold: 0.15 }  // Trigger when 15% of element is visible
    );

    // Attach observer to every element marked for scroll animation
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  }

  // ─── ACTIONS ────────────────────────────────────────────────────────────────

  // Called when "Get Started" CTA button is clicked
  onGetStarted(): void {
    alert('Redirecting to registration page...');
    // In a real app: this.router.navigate(['/register']);
  }

  // Called when contact form is submitted
  onContactSubmit(event: Event): void {
    event.preventDefault();   // Prevent default browser form submission
    alert('Thank you! We will get back to you soon.');
  }
}
