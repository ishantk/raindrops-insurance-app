import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanService } from '../../service/plan.service';
import { BookingService } from '../../service/booking.servicec';
import { Booking } from '../../models/booking.model';
import { Plan } from 'src/app/models/plan.model';
declare var window: any;

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  booking!: FormGroup;
  submittedStep1: boolean = false;
  submittedStep2: boolean = false;
  submittedStep3: boolean = false;
  step: number = 0;
  plansList: any = [];
  finalData: any = [];
  questions: any = [];
  question1: any;
  question2: any;
  question3: any;
  question4: any;
  question5: any;
  showError: boolean = false;
  showSuccess: boolean = false;
  discount: number = 1;
  discountedPrice: number = 0;
  showSubmit: boolean = false;
  selectedPlan: any = {};
  
  constructor(
    private plans: PlanService,
    private bookingService: BookingService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // this.getPlans();
    this.loadPersonalInfoForm();
    for (let i = 1; i < 6; i++) {
      this.questions[i] = new window.bootstrap.Modal(
        document.getElementById('question' + i)
      );
    }
    this.questions[1].show();
  }

  loadPersonalInfoForm() {
    this.booking = this.formBuilder.group({
      below_30: ['', Validators.required],
      diseases: ['', Validators.required],
      physical_activity: ['', Validators.required],
      smoke: ['', Validators.required],
      alcohol: ['', { validators: [Validators.required], updateOn: 'change' }],
      name: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      age: ['', [Validators.required, Validators.max(99)]],
      planName: ['', Validators.required],
      validity: ['', Validators.required],
      paymentMode: ['', Validators.required],
      cardNumber: ['', Validators.required],
      premiumAmt: ['', Validators.required],
      paymentFreq: ['', Validators.required]
    },);
  }

  get bookingControl(): { [key: string]: AbstractControl; } {
    return this.booking.controls;
  }

  changeModal(i: number) {
    if (i > 1)
      this.questions[i - 1].hide();
    if (i < 6) {
      this.questions[i].show();
    } else {
      this.getPlans();
      this.step = 1
    }
  }


  onSubmitStep1(selectedPlan: any) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const validity = new Date(year + 1, month, day).toISOString().substring(0, 10);

    this.booking.controls['planName'].setValue(selectedPlan.planName);
    this.booking.controls['premiumAmt'].setValue(selectedPlan.premiumAmt);
    this.booking.controls['validity'].setValue(validity);
    this.step = 2;
  }

  onSubmitStep2() {
    this.submittedStep3 = true;

    if (this.booking.valid) {
      this.bookingService.bookingAdd(this.booking.value).subscribe(res => {
        this.finalData = res;
        this.step = 3;
        this.showSuccess = true;
        console.log(res);
        this.showError = false;

      });
    } else {
      this.showError = true;
    }
  }

  getPlans() {
    if (this.booking.controls['below_30'].value == 'No')
      this.discount += .05;

    if (this.booking.controls['diseases'].value == 'Yes')
      this.discount += .01;

    if (this.booking.controls['physical_activity'].value == 'No')
      this.discount += .05;

    if (this.booking.controls['smoke'].value == 'Yes')
      this.discount += .2;

    if (this.booking.controls['alcohol'].value == 'Yes')
      this.discount += .2;
    console.log(this.discount, this.booking.value);

    this.plans.getPlan().subscribe((res: any) => {
      this.plansList = res;
    });
  }

  // View Plan Details - Modal
  viewPlanDetails(planId: any) {

    this.plans.getPlanDetails(planId).subscribe((res: Plan) => {
      this.selectedPlan = res;
      this.selectedPlan.premiumAmt = this.selectedPlan.baseAmt * this.discount;
      var planDetailsModal = new window.bootstrap.Modal(document.getElementById('planDetailsModal'));
      planDetailsModal.show();
    });
  }


}
