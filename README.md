## Set Up Instructions

### Backend Setup

1. Open three separate terminal tabs/windows for each microservice.

2. In the first terminal, start the User Service:
```bash
cd backend/user-service
mvn clean package && mvn spring-boot:run
```

3. In the third terminal, start the SkillsHub Service:
```bash
cd backend/skillshub-service
mvn clean package && mvn spring-boot:run
```

4. In the second terminal, start the Communities Service:
```bash
cd backend/communities-service
mvn clean package && mvn spring-boot:run
```

Note: Each service must be running in its own terminal session.

### Frontend Setup

1. Install dependencies:
```bash
cd frontend/skillhour
npm install
```

2. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

# SkillHour

## Overview
**SkillHour** is a peer-to-peer platform for learning and teaching through a time-banking system called **TimeCreds**. Users can host or join lessons, connect in communities, and exchange skills online or offline.

## Key Features

### Implemented Features

1. **Account Creation**: Create accounts to track activities and manage TimeCreds.
2. **SkillsHub**: Browse or host online/offline lessons. TimeCreds are deducted from students and deposited to instructors after lessons.
3. **Communities**: Connect with others, and browse lessons in interest-based groups.
4. **Reviews System**: Students and instructors review each other to ensure accountability and improve quality.
5. **TimeCreds System**: Earn or spend TimeCreds for lessons, incentivizing participation and feedback.

### To Be Implemented

1. **Chat Functionality**: Direct messaging and lesson-specific chats.
2. **Additional TimeCreds Generation**:
   - Rewards for moderating communities or providing feedback.
   - TimeCred multipliers based on ratings.
   - Opportunities for students to earn TimeCreds by assisting instructors or preparing materials.
3. **Community Creation**: Allow users to create their own communities. (Costs TimeCreds to Create)
4. **Post Creation**: Create posts in communities.

## How It Works
1. **Create an Account**: Sign up as a user to both learn and teach.
2. **Browse Lessons**: Find lessons in the SkillsHub.
3. **Join or Host**: Use TimeCreds to join lessons or host your own.
4. **Participate and Review**: Engage in lessons and provide feedback.
5. **Earn TimeCreds**: Teach, assist, prepare materials, or contribute to communities.

## User Journey

### New User
1. Navigate to register new account in "My Profile" tab.
2. Registers with their own account (any email and password).
3. Logs in and receives 10 base TimeCreds.
4. Browses Communities to see what areas they are interested in.
5. Navigate to Communities tab then "Data Analytics Learning Hub" community.
6. Signs up for a Data Analytics lesson starting in 15 minutes.
7. Read "Getting Started with Pandas" by Jane Smith.
8. Leaves a comment to ask for more resources.

*Switch to Jane's perspective who is going to start her lesson.*
*Log out of new user's account.*

### Instructor (Jane)
1. Logs in using the account:
   - Email: `jane@example.com`
   - Password: `password`
2. Navigate "SkillsHub" tab and opens "Data Analytics with Pandas" lesson that she is hosting.
3. Press "Start Lesson" and starts teaching the Data Analytics lesson.
   - *Simulate a video call or Zoom link shared via the lesson chat function.*
4. Ends the lesson and reviews all students.
5. Receives TimeCreds credited from the students.

*Swap back to new user perspective.*

### New User (Student)
1. Logs back into their account (log out of Jane's account first).
2. Reviews Jane (the instructor) and submits feedback.
3. Wants to host own lesson, navigates to "SkillsHub" tab and clicks on "Host a Lesson"
4. Fills up input as desired.
5. New lesson will appear on SkillsHub and Communities (if Host Community was indicated).

## Key Decisions

### 1. **Community-Driven Platform**

To prioritize a community-based platform over monetization, SkillHour provides diverse and varied avenues for users to connect and engage with fellow learners and teachers, including:

- **Chat**: Enables both direct messaging and lesson-specific communication.
- **Group Lessons**: Promotes shared learning experiences for community engagement.
- **Communities**: Provides hubs for users to share posts, discuss topics, and browse lessons of interest.

### 2. **Sustainable TimeCreds Economy**

### TimeCreds Generation
Users need additional ways to generate TimeCreds (beyond 10 base TimeCreds) to avoid a transactional 1-to-1 exchange of time and TimeCreds. A purely transactional model diminishes the collaborative spirit of the platform.

>> **Solution**:  
>> Generate TimeCreds by rewarding instructors and learners based on their performance and reviews to promote quality and engagement.

### Earning TimeCreds through Community Building
Users who may not feel comfortable leading classes need avenues to contribute meaningfully to the community and earn TimeCreds.

>> **Solution**:  
>> Provide opportunities to earn TimeCreds through:
>>    - Moderating communities.
>>    - Assisting instructors as teaching assistants or preparing lesson materials.

### 3. **Technical Considerations**

- Reused assets and styling from a previous project to speed up development while maintaining an aesthetic design for the POC.  
- Set up an H2 in-memory database with mocked data on backend startup for rapid prototyping.  
- Implemented full-stack functionality for key features like user, skillshub and communities services to validate viability and showcase the code structure. For non-critical features, shortcuts were taken, such as using web images for profile pictures and `useState` for community post likes.  
- Adopted a microservice architecture with JWT authentication for familiarity from past projects and faster initial development. In hindsight, this added unnecessary complexity for a POC and slowed progress as the project grew.  


## Project Plans

### Phase I: POC and MVP Testing
- Focus on niche communities, such as technical lessons, to build a targeted user base.
- Limit lessons to online-only formats for simplified logistics and easy adoption.
- Test key functionalities like chat, group lessons, and TimeCreds system within controlled environments.

### Phase II: Expansion to Real Life
- Gradually roll out in-person classes with strict logistical controls.
- Ensure safety through proper venue selection, attendee protocols, and risk assessments.
- Gather user feedback to refine offline interactions and address challenges specific to in-person lessons.

### Phase III: Expansion to Bigger Events and Different Formats
- Organize large-scale events such as hackathons, workshop series, and collaborative programs with educational institutions.
- Explore different learning formats to cater to diverse user needs and interests.
- Implement monetization strategies by allowing users to purchase TimeCreds, creating a sustainable revenue stream.

## Project Milestones

1. **Deployment and Product Launch**
   - Launch the platform after successful MVP development and user testing.

2. **Self-Sustained Growth**
   - Growing communities 
   - Sustained increase in active user engagement 
   - Minimal intervention from developers

3. **Expansion to Bigger Events with External Organizers**
   - Facilitate large-scale events initiated and managed by communities with minimal developer oversight.
   - Communities seek, engage, and organize collaborations with external organizers independently.


