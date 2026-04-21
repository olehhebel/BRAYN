export type CoachName = 'Kayra' | 'Orra' | 'Maverick';

export interface GoalRoute {
  coach: CoachName;
  color: string;
  primaryBranch: string;
  supportBranch: string;
  focus: string;
  proof: string;
}

export interface AppState {
  braynName: string;
  whoAreYou: string;
  goal: string;
  timeBudget: string;
  route: GoalRoute | null;
}
