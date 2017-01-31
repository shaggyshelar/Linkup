/** Angular Dependencies */
import { NgModule } from '@angular/core';

/** Module level Dependencies */
// Components Declarations
import { CommonModule } from '../core/index';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { EducationComponent } from './components/education/education.component';
import { CertificationComponent } from './components/certification/certification.component';
import { AchievementComponent } from './components/achievement/achievement.component';
import { EmploymentHistoryComponent } from './components/employment-history/employment-history.component';
import { SkillSetComponent } from './components/skill-set/skill-set.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { VisaComponent } from './components/profile-details/visa/visa.component';
import { ProfileAddressComponent } from './components/profile-details/profile-address/profile-address.component';
import { UANComponent } from './components/profile-details/uan/uan.component';
import { PassportComponent } from './components/profile-details/passport/passport.component';
import { NomineesComponent } from './components/profile-details/nominees/nominees.component';
import { IdentityProofsComponent } from './components/profile-details/identity-proofs/identity-proofs.component';

// Services Delarations
import { ProfileService } from './services/profile.service';
import { AchievementService } from './services/achievement.service';
import { CertificateService } from './services/certificate.service';
import { SkillService } from './services/skill.service';
import { EducationService } from './services/education.service';
import { EmploymentHistoryService } from './services/employmentHistory.service';
import { ExperienceService } from './services/experience.service';
import { AddressService } from './services/address.service';
import { IdentityProofService } from './services/identityProof.service';
import { NomineesService } from './services/nominees.service';
import { PassportService } from './services/passport.service';
import { UanService } from './services/uan.service';
import { VisaService } from './services/visa.service';

//Master
import { SkillMasterService } from '../core/shared/services/master/skillMaster.service';
import { CertificationMasterService } from '../core/shared/services/master/certificationMaster.service';
import { CertificationCodeMasterService } from '../core/shared/services/master/certificationCodeMaster.service';
import { IdentityTypeMasterService } from '../core/shared/services/master/identityTypeMaster.service';
import { ClassMasterService } from '../core/shared/services/master/classMaster.service';
import { GradeMasterService } from '../core/shared/services/master/gradeMaster.service';

/** Module Definition */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MyProfileComponent,
        PersonalInfoComponent,
        EducationComponent,
        CertificationComponent,
        AchievementComponent,
        EmploymentHistoryComponent,
        SkillSetComponent,
        ExperienceComponent,
        ProfileDetailsComponent,
        VisaComponent,
        ProfileAddressComponent,
        UANComponent,
        PassportComponent,
        NomineesComponent,
        IdentityProofsComponent
    ],
    providers: [ProfileService, AchievementService, CertificateService, SkillService, EducationService, EmploymentHistoryService,
        ExperienceService, AddressService, IdentityProofService, NomineesService, PassportService, UanService, VisaService,
        SkillMasterService, CertificationMasterService, CertificationCodeMasterService, IdentityTypeMasterService,
        ClassMasterService, GradeMasterService
    ]
})

export class ProfileModule {
}
