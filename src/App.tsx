import { FormEvent, ReactNode, useMemo, useState } from "react";

type Screen =
  | "blueprint"
  | "designSystem"
  | "prototype"
  | "handoff"
  | "onboarding"
  | "systemStates"
  | "home"
  | "birthdays"
  | "students"
  | "approvals"
  | "templates"
  | "activity"
  | "reports"
  | "integrations"
  | "team"
  | "settings";

type IconName =
  | "home"
  | "cake"
  | "users"
  | "check"
  | "grid"
  | "bell"
  | "search"
  | "plus"
  | "arrow"
  | "calendar"
  | "clock"
  | "alert"
  | "file"
  | "chart"
  | "plug"
  | "settings"
  | "shield"
  | "mail"
  | "message"
  | "edit"
  | "chevron"
  | "more";

const paths: Record<IconName, ReactNode> = {
  home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
  cake: <><path d="M4 13h16v8H4zM4 17h16M7 13V9m5 4V8m5 5V9" /><path d="M7 6c1-1 1-2 0-3-1 1-1 2 0 3Zm5-1c1-1 1-2 0-3-1 1-1 2 0 3Zm5 1c1-1 1-2 0-3-1 1-1 2 0 3Z" /></>,
  users: <><circle cx="9" cy="8" r="4" /><path d="M2 21c0-4 3-7 7-7s7 3 7 7M16 4c3 0 5 2 5 5s-2 5-5 5m1 1c3 0 5 2 5 6" /></>,
  check: <><path d="m5 12 4 4L19 6" /><circle cx="12" cy="12" r="10" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  search: <><circle cx="10" cy="10" r="7" /><path d="m15 15 6 6" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  arrow: <path d="m5 12 14 0m-5-5 5 5-5 5" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  alert: <><path d="M12 3 2 21h20L12 3Z" /><path d="M12 9v5m0 3v.1" /></>,
  file: <><path d="M6 2h8l4 4v16H6zM14 2v5h5M9 12h6m-6 4h6" /></>,
  chart: <><path d="M4 20V10m6 10V4m6 16v-7m5 7H2" /></>,
  plug: <><path d="m8 12 8-8m-6-2 4 4M5 11l8 8m-3-1-3 3m10-13 4 4-5 5-9-9 5-5 5 5Z" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1l2-2-2-4-3 1a8 8 0 0 0-2-1l-1-3H9L8 5a8 8 0 0 0-2 1L3 5 1 9l2 2a7 7 0 0 0 0 2l-2 2 2 4 3-1a8 8 0 0 0 2 1l1 3h4l1-3a8 8 0 0 0 2-1l3 1 2-4-2-2a7 7 0 0 0 .1-1Z" /></>,
  shield: <><path d="M12 2 4 5v6c0 5 3 9 8 11 5-2 8-6 8-11V5l-8-3Z" /><path d="m8 12 3 3 5-6" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m3 6 9 7 9-7" /></>,
  message: <><path d="M4 4h16v13H8l-4 4V4Z" /><path d="M8 9h8m-8 4h5" /></>,
  edit: <><path d="m14 4 6 6L9 21H3v-6L14 4Z" /><path d="m12 6 6 6" /></>,
  chevron: <path d="m9 6 6 6-6 6" />,
  more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

const students = [
  { name: "Amina Yusuf", initials: "AY", id: "BHS-24018", className: "JSS 2A", birthday: "Today, 14 May", status: "Greeting ready", tone: "gold" },
  { name: "Chinedu Okafor", initials: "CO", id: "BHS-23104", className: "Primary 6", birthday: "Today, 14 May", status: "Awaiting review", tone: "purple" },
  { name: "Ifeoma Eze", initials: "IE", id: "BHS-25122", className: "Primary 3B", birthday: "Tomorrow, 15 May", status: "Draft needed", tone: "neutral" },
  { name: "David Adekunle", initials: "DA", id: "BHS-22089", className: "SSS 1", birthday: "17 May", status: "Scheduled", tone: "success" },
  { name: "Zainab Bello", initials: "ZB", id: "BHS-24510", className: "JSS 1C", birthday: "19 May", status: "Active record", tone: "success" },
  { name: "Tomi Balogun", initials: "TB", id: "BHS-24876", className: "Primary 5A", birthday: "22 May", status: "Active record", tone: "success" },
];

const nav: { key: Screen; label: string; icon: IconName }[] = [
  { key: "home", label: "Home", icon: "home" },
  { key: "birthdays", label: "Birthdays", icon: "cake" },
  { key: "students", label: "Students", icon: "users" },
  { key: "approvals", label: "Approvals", icon: "check" },
];

const moreNav: { key: Screen; label: string; icon: IconName; detail: string }[] = [
  { key: "blueprint", label: "Product blueprint", icon: "grid", detail: "Pages 01–13 and information architecture" },
  { key: "designSystem", label: "Design system", icon: "file", detail: "Tokens, components and interaction states" },
  { key: "prototype", label: "Prototype flows", icon: "arrow", detail: "Launch six clickable journeys" },
  { key: "templates", label: "Greeting templates", icon: "edit", detail: "Create and manage approved copy" },
  { key: "activity", label: "Activity & delivery", icon: "clock", detail: "Audit trail and message status" },
  { key: "reports", label: "Reports", icon: "chart", detail: "Performance and delivery insights" },
  { key: "integrations", label: "Integrations", icon: "plug", detail: "Email, WhatsApp and data sources" },
  { key: "team", label: "Team & permissions", icon: "shield", detail: "Roles, invitations and access" },
  { key: "settings", label: "School settings", icon: "settings", detail: "Profile, policy and security" },
  { key: "systemStates", label: "Privacy & system states", icon: "bell", detail: "Notifications, errors and protected access" },
  { key: "handoff", label: "Developer handoff", icon: "file", detail: "Dependencies, responsive rules and decisions" },
];

function Button({ children, variant = "primary", icon, onClick, disabled, type = "button" }: { children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger"; icon?: IconName; onClick?: () => void; disabled?: boolean; type?: "button" | "submit" }) {
  return <button type={type} className={`button button--${variant}`} onClick={onClick} disabled={disabled}>{icon && <Icon name={icon} size={18} />}<span>{children}</span></button>;
}

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: string }) {
  return <span className={`badge badge--${tone}`}><span className="badge__dot" />{children}</span>;
}

function Avatar({ initials, gold = false }: { initials: string; gold?: boolean }) {
  return <span className={`avatar ${gold ? "avatar--gold" : ""}`}>{initials}</span>;
}

function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return <div className="section-title"><h2>{title}</h2>{action && <button className="text-button" onClick={onAction}>{action}<Icon name="arrow" size={15} /></button>}</div>;
}

function StudentRow({ student, onClick }: { student: typeof students[number]; onClick?: () => void }) {
  return <button className="student-row" onClick={onClick}>
    <Avatar initials={student.initials} gold={student.tone === "gold"} />
    <span className="student-row__copy"><strong>{student.name}</strong><small>{student.className} · {student.birthday}</small></span>
    <Badge tone={student.tone}>{student.status}</Badge>
    <Icon name="chevron" size={17} />
  </button>;
}

function AppShell({ screen, setScreen, children, onSignOut }: { screen: Screen; setScreen: (screen: Screen) => void; children: ReactNode; onSignOut: () => void }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const activeLabel = [...nav, ...moreNav].find((item) => item.key === screen)?.label ?? "Home";
  return <div className="app-shell">
    <aside className="sidebar">
      <Brand />
      <div className="demo-pill"><span /> Fictional demo workspace</div>
      <nav className="sidebar__nav" aria-label="Main navigation">
        <p className="eyebrow">Workspace</p>
        {nav.map((item) => <button key={item.key} className={screen === item.key ? "active" : ""} onClick={() => setScreen(item.key)}><Icon name={item.icon} />{item.label}{item.key === "approvals" && <em>3</em>}</button>)}
        <p className="eyebrow">Manage</p>
        {moreNav.map((item) => <button key={item.key} className={screen === item.key ? "active" : ""} onClick={() => setScreen(item.key)}><Icon name={item.icon} />{item.label}</button>)}
      </nav>
      <div className="sidebar__profile">
        <Avatar initials="OA" /><span><strong>Olivia Adeyemi</strong><small>School Administrator</small></span>
        <button aria-label="Sign out" onClick={onSignOut}><Icon name="more" /></button>
      </div>
    </aside>
    <div className="workspace">
      <header className="topbar">
        <div className="mobile-brand"><span className="brand__mark">S</span><span><strong>SBCS</strong><small>BlueHaven Academy</small></span></div>
        <div className="topbar__title"><span className="eyebrow">BlueHaven Academy</span><strong>{activeLabel}</strong></div>
        <div className="topbar__actions">
          <span className="demo-label">DEMO DATA</span>
          <button className="icon-button" aria-label="Search"><Icon name="search" /></button>
          <button className="icon-button notification" aria-label="Notifications"><Icon name="bell" /><span /></button>
          <Avatar initials="OA" />
        </div>
      </header>
      <main>{children}</main>
    </div>
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {nav.map((item) => <button key={item.key} className={screen === item.key ? "active" : ""} onClick={() => { setScreen(item.key); setMoreOpen(false); }}><span className="nav-icon"><Icon name={item.icon} size={21} />{item.key === "approvals" && <em>3</em>}</span><small>{item.label}</small></button>)}
      <button className={moreOpen || moreNav.some((item) => item.key === screen) ? "active" : ""} onClick={() => setMoreOpen(!moreOpen)}><Icon name="grid" size={21} /><small>More</small></button>
    </nav>
    {moreOpen && <div className="more-sheet" role="dialog" aria-modal="true" aria-label="More navigation">
      <div className="sheet-handle" />
      <div className="section-title"><h2>More</h2><button className="icon-button" onClick={() => setMoreOpen(false)} aria-label="Close">×</button></div>
      <div className="more-grid">{moreNav.map((item) => <button key={item.key} onClick={() => { setScreen(item.key); setMoreOpen(false); }}><span className="feature-icon"><Icon name={item.icon} /></span><span><strong>{item.label}</strong><small>{item.detail}</small></span><Icon name="chevron" size={17} /></button>)}</div>
    </div>}
  </div>;
}

function Brand() {
  return <div className="brand"><span className="brand__mark">S</span><span><strong>SBCS Mobile</strong><small>by BlueHaven Studios</small></span></div>;
}

function PageHeader({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description: string; children?: ReactNode }) {
  return <div className="page-header"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1><p>{description}</p></div>{children && <div className="page-header__actions">{children}</div>}</div>;
}

function Dashboard({ setScreen, openStudent }: { setScreen: (s: Screen) => void; openStudent: () => void }) {
  return <div className="page">
    <PageHeader eyebrow="Wednesday, 14 May" title="Good morning, Olivia." description="Here is your school's birthday activity.">
      <Button variant="secondary" icon="calendar" onClick={() => setScreen("birthdays")}>View calendar</Button>
      <Button icon="plus" onClick={() => setScreen("students")}>Add student</Button>
    </PageHeader>
    <div className="metrics">
      <button onClick={() => setScreen("birthdays")} className="metric metric--featured"><span className="metric__icon"><Icon name="cake" /></span><span><small>Birthdays today</small><strong>2</strong><em>Both greetings prepared</em></span></button>
      <button onClick={() => setScreen("birthdays")} className="metric"><span className="metric__icon"><Icon name="calendar" /></span><span><small>Next 7 days</small><strong>8</strong><em>3 drafts needed</em></span></button>
      <button onClick={() => setScreen("approvals")} className="metric"><span className="metric__icon purple"><Icon name="clock" /></span><span><small>Awaiting review</small><strong>3</strong><em>Oldest: 2 hours</em></span></button>
      <button onClick={() => setScreen("activity")} className="metric"><span className="metric__icon danger"><Icon name="alert" /></span><span><small>Delivery issues</small><strong>1</strong><em>Requires attention</em></span></button>
    </div>
    <div className="dashboard-grid">
      <section className="panel panel--large">
        <SectionTitle title="Today's birthdays" action="View all" onAction={() => setScreen("birthdays")} />
        <div className="student-list">{students.slice(0, 2).map((student) => <StudentRow key={student.id} student={student} onClick={openStudent} />)}</div>
      </section>
      <section className="panel quick-panel">
        <SectionTitle title="Quick actions" />
        <div className="quick-actions">
          <button onClick={() => setScreen("students")}><Icon name="plus" /><span><strong>Add student</strong><small>Create a record</small></span></button>
          <button onClick={() => setScreen("students")}><Icon name="file" /><span><strong>Import list</strong><small>Review before import</small></span></button>
          <button onClick={() => setScreen("templates")}><Icon name="edit" /><span><strong>New template</strong><small>Save as draft</small></span></button>
          <button onClick={() => setScreen("approvals")}><Icon name="check" /><span><strong>Review queue</strong><small>3 awaiting review</small></span></button>
        </div>
      </section>
      <section className="panel">
        <SectionTitle title="Upcoming birthdays" action="Open calendar" onAction={() => setScreen("birthdays")} />
        <div className="compact-list">{students.slice(2, 5).map((s) => <div key={s.id}><Avatar initials={s.initials} /><span><strong>{s.name}</strong><small>{s.className}</small></span><time>{s.birthday}</time></div>)}</div>
      </section>
      <section className="panel">
        <SectionTitle title="System readiness" action="Configure" onAction={() => setScreen("integrations")} />
        <div className="readiness">
          <div><span><Icon name="users" /><strong>Student data</strong></span><Badge tone="warning">Demo source</Badge></div>
          <div><span><Icon name="mail" /><strong>Email provider</strong></span><Badge tone="danger">Not connected</Badge></div>
          <div><span><Icon name="message" /><strong>WhatsApp</strong></span><Badge tone="danger">Not connected</Badge></div>
          <div><span><Icon name="shield" /><strong>Approval policy</strong></span><Badge tone="success">Configured</Badge></div>
        </div>
      </section>
      <section className="panel panel--wide">
        <SectionTitle title="Recent activity" action="View audit trail" onAction={() => setScreen("activity")} />
        <Timeline compact />
      </section>
    </div>
  </div>;
}

function Birthdays({ openStudent, setScreen }: { openStudent: () => void; setScreen: (s: Screen) => void }) {
  const [filter, setFilter] = useState("This month");
  return <div className="page">
    <PageHeader eyebrow="Birthday planning" title="Birthday queue" description="Prepare greetings early, review every message, and keep delivery separate from approval.">
      <Button variant="secondary" icon="calendar">May 2025</Button>
      <Button icon="edit" onClick={() => setScreen("templates")}>Create greeting</Button>
    </PageHeader>
    <div className="segmented">{["Today", "This week", "This month", "Needs action"].map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}{item === "Needs action" && <span>3</span>}</button>)}</div>
    <div className="content-split">
      <section className="panel calendar-panel">
        <div className="calendar-head"><div><h2>May 2025</h2><p>8 upcoming birthdays</p></div><div><button aria-label="Previous month">‹</button><button>Today</button><button aria-label="Next month">›</button></div></div>
        <div className="calendar-grid calendar-grid--days">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => <span key={d}>{d}</span>)}</div>
        <div className="calendar-grid">{Array.from({ length: 35 }, (_, i) => { const day = i - 2; const has = [5, 8, 14, 15, 17, 19, 22, 28].includes(day); return <button key={i} className={`${day === 14 ? "today" : ""} ${day < 1 || day > 31 ? "muted" : ""}`}><span>{day < 1 ? 30 + day : day > 31 ? day - 31 : day}</span>{has && <i />}</button>; })}</div>
        <div className="calendar-legend"><span><i className="gold-dot" />Birthday</span><span><i className="ring-dot" />Today</span></div>
      </section>
      <section className="panel birthday-list-panel">
        <SectionTitle title={`${filter}'s queue`} />
        <div className="student-list">{students.slice(0, filter === "Today" ? 2 : 5).map((s) => <StudentRow key={s.id} student={s} onClick={openStudent} />)}</div>
      </section>
    </div>
  </div>;
}

function Students({ onToast }: { onToast: (s: string) => void }) {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [importStep, setImportStep] = useState(0);
  const filtered = useMemo(() => students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())), [search]);
  if (importStep > 0) return <ImportWizard step={importStep} setStep={setImportStep} onToast={onToast} />;
  return <div className="page">
    <PageHeader eyebrow="Student records" title="Students" description="Only the minimum birthday information authorized for this school is shown.">
      <Button variant="secondary" icon="file" onClick={() => setImportStep(1)}>Import records</Button>
      <Button icon="plus" onClick={() => setShowForm(true)}>Add student</Button>
    </PageHeader>
    <section className="panel">
      <div className="toolbar">
        <label className="search-field"><Icon name="search" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name or student ID" aria-label="Search students" /></label>
        <select aria-label="Filter by class"><option>All classes</option><option>Primary</option><option>JSS</option><option>SSS</option></select>
        <select aria-label="Sort students"><option>Upcoming birthday</option><option>Name A–Z</option></select>
        <span className="record-count">{filtered.length} demo records</span>
      </div>
      <div className="table-head"><span>Student</span><span>ID</span><span>Class</span><span>Birthday</span><span>Status</span><span /></div>
      <div className="directory">{filtered.map((s) => <button key={s.id}><span className="student-cell"><Avatar initials={s.initials} /><strong>{s.name}</strong></span><span>{s.id}</span><span>{s.className}</span><span>{s.birthday.replace("Today, ","").replace("Tomorrow, ","")}</span><Badge tone="success">Active</Badge><Icon name="chevron" size={17} /></button>)}</div>
      {filtered.length === 0 && <div className="empty-state"><span className="feature-icon"><Icon name="search" /></span><h2>No students found</h2><p>Try another name or clear your filters.</p><Button variant="secondary" onClick={() => setSearch("")}>Clear search</Button></div>}
    </section>
    {showForm && <Modal title="Add student" subtitle="Create a fictional demo record. This will not persist." onClose={() => setShowForm(false)}>
      <form onSubmit={(e) => { e.preventDefault(); setShowForm(false); onToast("Demo student validated. No record was saved."); }}>
        <div className="form-grid"><Field label="Student ID" placeholder="e.g. BHS-25130" required /><Field label="Date of birth" type="date" required /><Field label="First name" placeholder="First name" required /><Field label="Last name" placeholder="Last name" required /><Field label="Preferred display name" placeholder="Optional" /><Field label="Class or grade" placeholder="Select class" required /></div>
        <div className="privacy-note"><Icon name="shield" /><span><strong>Privacy by design</strong><small>Do not add addresses, medical details, or identity documents.</small></span></div>
        <div className="modal-actions"><Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button><Button type="submit">Validate record</Button></div>
      </form>
    </Modal>}
  </div>;
}

function Field({ label, placeholder = "", type = "text", required }: { label: string; placeholder?: string; type?: string; required?: boolean }) {
  return <label className="field"><span>{label}{required ? " *" : ""}</span><input type={type} placeholder={placeholder} required={required} /><small>{required ? "Required" : "Optional"}</small></label>;
}

function ImportWizard({ step, setStep, onToast }: { step: number; setStep: (n: number) => void; onToast: (s: string) => void }) {
  const labels = ["Source", "Map columns", "Validate", "Confirm"];
  return <div className="page wizard-page">
    <button className="back-button" onClick={() => setStep(step === 1 ? 0 : step - 1)}>‹ Back</button>
    <PageHeader eyebrow="Guided import" title={step === 1 ? "Choose a data source" : step === 2 ? "Map your columns" : step === 3 ? "Review validation" : "Confirm import"} description="Records are never committed until an authorized user explicitly confirms the import." />
    <div className="stepper">{labels.map((label, i) => <div key={label} className={step >= i + 1 ? "active" : ""}><span>{step > i + 1 ? "✓" : i + 1}</span><small>{label}</small></div>)}</div>
    <section className="panel wizard-panel">
      {step === 1 && <><div className="source-grid"><button className="selected"><span className="feature-icon"><Icon name="file" /></span><strong>CSV file</strong><small>Recommended · Review before import</small><Badge tone="success">Available in demo</Badge></button><button><span className="feature-icon"><Icon name="grid" /></span><strong>Excel workbook</strong><small>.xlsx format</small><Badge>Requires backend</Badge></button><button><span className="feature-icon"><Icon name="plug" /></span><strong>Google Sheets</strong><small>Connect approved account</small><Badge>Not connected</Badge></button></div><div className="drop-zone"><Icon name="file" size={30} /><strong>Choose a fictional sample file</strong><small>CSV only · Nothing will be uploaded in this prototype</small><Button variant="secondary" onClick={() => setStep(2)}>Use sample_students.csv</Button></div></>}
      {step === 2 && <><div className="import-summary"><Badge tone="success">File parsed locally</Badge><strong>sample_students.csv</strong><small>128 rows · 6 columns · demonstration only</small></div><div className="mapping-list">{["student_id","first_name","last_name","date_of_birth","class_name","active_status"].map((f) => <div key={f}><code>{f}</code><Icon name="arrow" /><select defaultValue={f}><option>{f}</option></select><Badge tone="success">Mapped</Badge></div>)}</div></>}
      {step === 3 && <><div className="validation-metrics"><div><strong>128</strong><small>Total rows</small></div><div className="success"><strong>122</strong><small>Valid</small></div><div className="danger"><strong>4</strong><small>Invalid</small></div><div className="warning"><strong>2</strong><small>Duplicates</small></div></div><div className="warning-box"><Icon name="alert" /><span><strong>6 rows need your attention</strong><small>Invalid rows will be skipped unless corrected. No records have been imported.</small></span><Button variant="secondary">Download error report</Button></div><div className="error-rows"><div><span>Row 17</span><strong>Invalid birthday date</strong><code>31/18/2013</code><Badge tone="danger">Invalid</Badge></div><div><span>Row 42</span><strong>Possible duplicate ID</strong><code>BHS-24018</code><Badge tone="warning">Review</Badge></div></div></>}
      {step === 4 && <><div className="confirm-hero"><span className="feature-icon"><Icon name="shield" /></span><h2>Ready for explicit confirmation</h2><p>122 valid fictional records are ready. 4 invalid rows and 2 possible duplicates will be skipped.</p></div><label className="check-row"><input type="checkbox" /><span><strong>I have reviewed the validation summary</strong><small>I understand this is a prototype and no database will be updated.</small></span></label></>}
      <div className="wizard-actions"><Button variant="ghost" onClick={() => setStep(step === 1 ? 0 : step - 1)}>Cancel</Button><Button onClick={() => { if (step < 4) setStep(step + 1); else { setStep(0); onToast("Prototype complete. No student data was imported."); } }}>{step === 4 ? "Confirm demo import" : "Continue"}<Icon name="arrow" size={17} /></Button></div>
    </section>
  </div>;
}

function Approvals({ onToast }: { onToast: (s: string) => void }) {
  const [selected, setSelected] = useState(0);
  const [confirm, setConfirm] = useState<"approve" | "reject" | null>(null);
  const [state, setState] = useState("Pending review");
  const [auditOpen, setAuditOpen] = useState(false);
  const item = students[selected];
  return <div className="page">
    <PageHeader eyebrow="Human approval center" title="Review queue" description="Approval authorizes the next workflow step. It does not mean a message was sent or delivered." />
    <div className="status-tabs">{[["Pending",3],["Approved",12],["Returned",2],["Scheduled",5],["Failed",1]].map(([l,c]) => <button key={l as string} className={l === "Pending" ? "active" : ""}>{l}<span>{c}</span></button>)}</div>
    <div className="approval-layout">
      <section className="panel approval-list">
        <div className="approval-list__head"><h2>Pending review</h2><Badge tone="purple">3 items</Badge></div>
        {students.slice(0, 3).map((s, i) => <button key={s.id} className={selected === i ? "active" : ""} onClick={() => { setSelected(i); setState("Pending review"); }}><Avatar initials={s.initials} gold={i === 0} /><span><strong>{s.name}</strong><small>{s.className} · Birthday {s.birthday}</small><Badge tone={i === 0 ? "warning" : "neutral"}>{i === 0 ? "Due today" : "Submitted"}</Badge></span><Icon name="chevron" size={17} /></button>)}
      </section>
      <section className="panel review-panel">
        <div className="review-head"><div><span className="eyebrow">Greeting review</span><h2>{item.name}</h2><p>{item.className} · {item.id}</p></div><Badge tone={state === "Approved" ? "success" : state === "Returned" ? "danger" : "warning"}>{state}</Badge></div>
        <div className="context-strip"><div><small>Birthday</small><strong>{item.birthday}</strong></div><div><small>Channel</small><strong>Email · not connected</strong></div><div><small>Template</small><strong>Warm school greeting</strong></div></div>
        <div className="message-preview"><div className="preview-brand"><span className="brand__mark">B</span><span><strong>BlueHaven Academy</strong><small>Celebrating every learner</small></span></div><span className="eyebrow">A birthday message for</span><h3>{item.name}</h3><p>Happy birthday, {item.name.split(" ")[0]}! Your curiosity, kindness, and bright spirit make our school community better. We hope your new year is filled with joyful discoveries and wonderful memories.</p><footer>With warm wishes,<br /><strong>Everyone at BlueHaven Academy</strong></footer></div>
        <div className="validation-line"><Icon name="shield" /><span><strong>Validation passed</strong><small>Supported placeholders resolved · 242 characters · no sensitive fields</small></span></div>
        <div className="audit-summary"><span>Created by <strong>M. Okeke</strong></span><span>Submitted today at <strong>8:42 AM</strong></span><button onClick={() => setAuditOpen(true)}>View audit history</button></div>
        <div className="approval-note"><Icon name="alert" /><p><strong>Approval is not delivery.</strong> A backend delivery provider must be configured before this greeting can be queued.</p></div>
        <div className="review-actions"><Button variant="secondary" icon="edit">Request edits</Button><Button variant="danger" onClick={() => setConfirm("reject")}>Reject</Button><Button icon="check" onClick={() => setConfirm("approve")}>Approve greeting</Button></div>
      </section>
    </div>
    {confirm && <Modal title={confirm === "approve" ? "Approve this greeting?" : "Return this greeting?"} subtitle={confirm === "approve" ? `Confirm you reviewed the greeting for ${item.name}. This will not send it.` : "A correction note is required for the editor."} onClose={() => setConfirm(null)}>
      {confirm === "reject" && <label className="field"><span>Correction note *</span><textarea required placeholder="Explain what needs to change…" /></label>}
      <div className="confirmation-note"><Icon name={confirm === "approve" ? "check" : "alert"} /><span><strong>{confirm === "approve" ? "Human approval recorded in this demo only" : "The editor will see your note"}</strong><small>No external message or database action will occur.</small></span></div>
      <div className="modal-actions"><Button variant="ghost" onClick={() => setConfirm(null)}>Cancel</Button><Button variant={confirm === "approve" ? "primary" : "danger"} onClick={() => { const next = confirm === "approve" ? "Approved" : "Returned"; setState(next); setConfirm(null); onToast(`${next} in this prototype. No message was sent.`); }}>Confirm {confirm}</Button></div>
    </Modal>}
    {auditOpen && <Modal title="Approval history" subtitle={`${item.name} · Fictional greeting audit`} onClose={() => setAuditOpen(false)}>
      <div className="timeline">
        {state !== "Pending review" && <div><span className={`timeline__mark ${state === "Approved" ? "success" : "danger"}`}><Icon name={state === "Approved" ? "check" : "alert"} size={16} /></span><span><strong>Greeting {state.toLowerCase()}</strong><small>Olivia Adeyemi · Authorized Approver</small></span><time>Just now</time></div>}
        <div><span className="timeline__mark purple"><Icon name="clock" size={16} /></span><span><strong>Submitted for review</strong><small>M. Okeke · Greeting Editor</small></span><time>Today, 8:42 AM</time></div>
        <div><span className="timeline__mark"><Icon name="edit" size={16} /></span><span><strong>Draft created</strong><small>M. Okeke · Warm school greeting v3</small></span><time>Today, 8:18 AM</time></div>
      </div>
      <div className="approval-note"><Icon name="shield" /><p>Production audit events must be immutable, tenant-isolated, and recorded by the backend.</p></div>
      <div className="modal-actions"><Button onClick={() => setAuditOpen(false)}>Done</Button></div>
    </Modal>}
  </div>;
}

function Templates({ onToast }: { onToast: (s: string) => void }) {
  const [editing, setEditing] = useState(false);
  return <div className="page">
    <PageHeader eyebrow="Greeting studio" title="School templates" description="Create reusable, school-specific greetings with safe, supported placeholders."><Button icon="plus" onClick={() => setEditing(true)}>Create template</Button></PageHeader>
    <div className="notice"><Icon name="shield" /><span><strong>School-isolated templates</strong><small>Only authorized BlueHaven Academy staff can view and edit this demonstration library.</small></span></div>
    <div className="template-grid">
      {[["Warm school greeting","Default · Email, WhatsApp","Dear {{student_name}}, today we celebrate you and the joy you bring…","success"],["Formal school greeting","Email · 318 characters","On behalf of {{school_name}}, we extend our warm wishes…","neutral"],["Primary school celebration","Email, visual card","Hooray! It is a special day for {{student_name}} in {{class_name}}…","purple"],["Text-only greeting","WhatsApp · 142 characters","Happy birthday, {{student_name}}! Warm wishes from everyone…","neutral"]].map((t,i) => <article className="template-card" key={t[0]}><div className={`template-art template-art--${i}`}><span className="brand__mark">B</span><Icon name="cake" size={32} /></div><div><span className="template-meta"><Badge tone={t[3]}>{i === 0 ? "Default" : i === 2 ? "Draft" : "Active"}</Badge><button aria-label="Template actions"><Icon name="more" /></button></span><h2>{t[0]}</h2><small>{t[1]}</small><p>{t[2]}</p><div><Button variant="secondary" onClick={() => setEditing(true)}>Edit</Button><Button variant="ghost">Preview</Button></div></div></article>)}
    </div>
    {editing && <Modal wide title="Edit template" subtitle="Draft changes require review before they become available for delivery." onClose={() => setEditing(false)}>
      <div className="editor-layout"><div><Field label="Template name" placeholder="Warm school greeting" required /><label className="field"><span>Greeting text *</span><textarea defaultValue={"Happy birthday, {{student_name}}! Your curiosity and bright spirit make {{school_name}} a better place. We hope your year is filled with joyful discoveries."} /></label><div className="placeholder-row"><small>Supported placeholders</small>{["{{student_name}}","{{school_name}}","{{class_name}}"].map(p => <button key={p}>{p}</button>)}</div><label className="field"><span>Compatible channels</span><select><option>Email and WhatsApp</option><option>Email only</option></select></label></div><div className="mini-preview"><span className="eyebrow">Sample preview</span><Icon name="cake" size={30} /><h3>Happy birthday, Amina!</h3><p>Your curiosity and bright spirit make BlueHaven Academy a better place. We hope your year is filled with joyful discoveries.</p><Badge tone="success">All placeholders resolved</Badge></div></div>
      <div className="modal-actions"><Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button><Button variant="secondary">Save draft</Button><Button onClick={() => { setEditing(false); onToast("Template saved as a local demo draft."); }}>Save & validate</Button></div>
    </Modal>}
  </div>;
}

function Timeline({ compact = false }: { compact?: boolean }) {
  const events = [
    ["Greeting submitted for review","M. Okeke · Amina Yusuf","Today, 8:42 AM","purple"],
    ["Message approved","Olivia Adeyemi · David Adekunle","Yesterday, 4:18 PM","success"],
    ["Delivery could not start","System · Email provider not configured","Yesterday, 4:19 PM","danger"],
    ["Student import reviewed","K. Bello · 122 valid demo rows","12 May, 11:06 AM","neutral"],
  ];
  return <div className={`timeline ${compact ? "timeline--compact" : ""}`}>{events.map((e) => <div key={e[0]}><span className={`timeline__mark ${e[3]}`}><Icon name={e[3] === "danger" ? "alert" : e[3] === "success" ? "check" : "clock"} size={16} /></span><span><strong>{e[0]}</strong><small>{e[1]}</small></span><time>{e[2]}</time></div>)}</div>;
}

function Activity({ onToast }: { onToast: (s: string) => void }) {
  const [retry, setRetry] = useState(false);
  return <div className="page">
    <PageHeader eyebrow="Operations" title="Activity & delivery" description="Approval, provider submission, and confirmed delivery are tracked as separate events." />
    <div className="delivery-alert"><span className="feature-icon danger"><Icon name="alert" /></span><span><Badge tone="danger">Action required</Badge><h2>Email greeting could not be queued</h2><p>A provider has not been connected. No delivery was attempted and no recipient data was shared.</p><div className="delivery-meta"><span><small>Student</small><strong>David Adekunle</strong></span><span><small>Current state</small><strong>Approved · not queued</strong></span><span><small>Last check</small><strong>13 May, 4:19 PM</strong></span></div></span><Button variant="secondary" onClick={() => setRetry(true)}>Check retry eligibility</Button></div>
    <section className="panel"><div className="toolbar"><div className="segmented compact"><button className="active">All activity</button><button>Approvals</button><button>Delivery</button><button>Imports</button></div><select><option>Last 30 days</option></select></div><Timeline /></section>
    {retry && <Modal title="Retry unavailable" subtitle="A safe retry requires a configured backend provider and idempotency protection." onClose={() => setRetry(false)}><div className="confirmation-note"><Icon name="plug" /><span><strong>Email provider is not connected</strong><small>Connect and test an approved provider before retrying. The prototype will not simulate a successful send.</small></span></div><div className="modal-actions"><Button variant="ghost" onClick={() => setRetry(false)}>Close</Button><Button onClick={() => { setRetry(false); onToast("Opening integration readiness."); }}>Review integrations</Button></div></Modal>}
  </div>;
}

function Reports() {
  return <div className="page">
    <PageHeader eyebrow="Clearly labeled sample values" title="Reports" description="Demonstration metrics for layout review only. No live school or provider data is connected."><Button variant="secondary" icon="file">Export unavailable</Button></PageHeader>
    <div className="toolbar standalone"><select><option>May 2025</option></select><select><option>All classes</option></select><select><option>All channels</option></select><Badge tone="warning">Demo data</Badge></div>
    <div className="report-metrics">{[["Birthdays processed","18","+12%"],["Greetings approved","16","89%"],["Confirmed deliveries","0","Provider unavailable"],["Avg. review time","2h 14m","Demo estimate"]].map((m,i) => <div key={m[0]}><small>{m[0]}</small><strong>{m[1]}</strong><span className={i === 2 ? "muted" : ""}>{m[2]}</span></div>)}</div>
    <div className="reports-grid"><section className="panel"><SectionTitle title="Greeting workflow" /><div className="bar-chart">{[["Drafted",24,90],["Submitted",20,75],["Approved",16,62],["Sent to provider",0,2],["Confirmed delivered",0,2]].map(b => <div key={b[0]}><span>{b[0]}</span><i><em style={{ width: `${b[2]}%` }} /></i><strong>{b[1]}</strong></div>)}</div><div className="chart-note"><Icon name="alert" /><span>Approved is not counted as delivered.</span></div></section><section className="panel"><SectionTitle title="Upcoming by class" /><div className="donut-wrap"><div className="donut"><strong>32</strong><small>birthdays</small></div><div className="legend">{[["Primary","14","gold"],["Junior secondary","10","purple"],["Senior secondary","8","silver"]].map(l => <div key={l[0]}><i className={l[2]} /><span>{l[0]}</span><strong>{l[1]}</strong></div>)}</div></div></section></div>
  </div>;
}

function Integrations() {
  return <div className="page">
    <PageHeader eyebrow="Configuration readiness" title="Integrations" description="Provider connections require secure backend configuration. Secrets never belong in this client."><Button variant="secondary" icon="shield">View dependency map</Button></PageHeader>
    <div className="integration-grid">
      <Integration icon="mail" title="Email delivery" status="Not connected" detail="No provider selected. Sender identity and delivery callbacks require backend configuration." items={["Provider","Not selected","Sender identity","Not verified","Last successful delivery","No data"]} />
      <Integration icon="message" title="WhatsApp Business" status="Not connected" detail="Use an authorized business provider and approved templates. No provider is hardcoded." items={["Provider","Not selected","Business account","Not connected","Template status","Unavailable"]} />
      <Integration icon="users" title="Student data source" status="Demo source" detail="The current interface uses isolated fictional records. No school management system is connected." items={["Source","Local demo adapter","Last sync","Never","Records","6 fictional"]} warning />
    </div>
    <section className="panel dependency"><SectionTitle title="Backend dependency map" /><div className="dependency-grid">{[["Authentication","Login, sessions, recovery, invitations","Required"],["School tenancy","Membership, roles, tenant isolation","Required"],["Student records","CRUD, validation, duplicate detection","Required"],["Approvals","Authorized state transitions, audit events","Required"],["Messaging","Queue, callbacks, idempotent retries","Required"],["Operations","Monitoring, backups, secure retention","Required"]].map(d => <div key={d[0]}><span className="feature-icon"><Icon name="plug" /></span><span><strong>{d[0]}</strong><small>{d[1]}</small></span><Badge tone="warning">{d[2]}</Badge></div>)}</div></section>
  </div>;
}

function Integration({ icon, title, status, detail, items, warning }: { icon: IconName; title: string; status: string; detail: string; items: string[]; warning?: boolean }) {
  return <article className="panel integration-card"><div className="integration-head"><span className="feature-icon"><Icon name={icon} /></span><Badge tone={warning ? "warning" : "danger"}>{status}</Badge></div><h2>{title}</h2><p>{detail}</p><div className="integration-data">{[0,2,4].map(i => <div key={items[i]}><small>{items[i]}</small><strong>{items[i+1]}</strong></div>)}</div><Button variant="secondary" disabled>Configure with backend</Button></article>;
}

function Team() {
  return <div className="page"><PageHeader eyebrow="Access control" title="Team & permissions" description="UI visibility is not authorization. Every permission must be enforced by the future backend."><Button icon="plus">Invite member</Button></PageHeader><div className="notice"><Icon name="shield" /><span><strong>Least-privilege access</strong><small>Platform support has no unrestricted access to student records by default.</small></span></div><section className="panel"><div className="table-head team-head"><span>Team member</span><span>Role</span><span>Status</span><span>Last active</span><span /></div><div className="directory team-directory">{[["Olivia Adeyemi","OA","School Administrator","Active","Now"],["Kunle Bello","KB","School Owner","Active","Yesterday"],["Mariam Okeke","MO","Greeting Editor","Active","2 hours ago"],["Grace Ekanem","GE","Approver","Invitation pending","Not joined"]].map(m => <button key={m[0]}><span className="student-cell"><Avatar initials={m[1]} /><span><strong>{m[0]}</strong><small>{m[0].toLowerCase().replace(" ",".")}@school.example</small></span></span><span>{m[2]}</span><Badge tone={m[3] === "Active" ? "success" : "warning"}>{m[3]}</Badge><span>{m[4]}</span><Icon name="more" /></button>)}</div></section></div>;
}

function Settings() {
  return <div className="page"><PageHeader eyebrow="Administration" title="School settings" description="Changes to approved messaging and data policies require explicit review."><Button>Save changes</Button></PageHeader><div className="settings-layout"><aside className="panel settings-nav">{["School profile","Birthday policy","Approval rules","Privacy & retention","Security","Notifications"].map((i,n) => <button className={n === 0 ? "active" : ""} key={i}>{i}<Icon name="chevron" size={16} /></button>)}</aside><section className="panel settings-form"><SectionTitle title="School profile" /><p>School identity used in approved greetings and administrative communication.</p><div className="school-logo"><span className="brand__mark">B</span><span><strong>School logo</strong><small>SVG or PNG · 2 MB maximum</small></span><Button variant="secondary">Replace</Button></div><div className="form-grid"><Field label="School name" placeholder="BlueHaven Academy" required /><Field label="Contact email" placeholder="admin@school.example" required /><Field label="Time zone" placeholder="Africa/Lagos (WAT)" required /><Field label="School location" placeholder="Lagos, Nigeria" /><Field label="Default greeting template" placeholder="Warm school greeting" required /><Field label="Calendar preference" placeholder="Monday–Friday" /></div><div className="privacy-note"><Icon name="shield" /><span><strong>Configuration changes are auditable</strong><small>Production changes should record the actor, timestamp, previous value, and reason.</small></span></div></section></div></div>;
}

function StudentDetail({ onClose, goApprovals }: { onClose: () => void; goApprovals: () => void }) {
  return <Modal wide title="Amina Yusuf" subtitle="Fictional student · BHS-24018 · JSS 2A" onClose={onClose}>
    <div className="student-profile"><div className="profile-hero"><Avatar initials="AY" gold /><div><Badge tone="success">Active record</Badge><h2>Birthday today</h2><p>14 May · Year hidden for this role</p></div></div><div className="profile-facts"><div><small>Data source</small><strong>Demo adapter</strong></div><div><small>Last synchronized</small><strong>Never · not connected</strong></div><div><small>Greeting status</small><strong>Awaiting review</strong></div></div><div className="message-preview compact-preview"><span className="eyebrow">Prepared greeting</span><h3>Happy birthday, Amina!</h3><p>Your curiosity, kindness, and bright spirit make our school community better.</p></div><div className="approval-note"><Icon name="shield" /><p>This greeting cannot progress to delivery until an authorized reviewer approves it.</p></div></div>
    <div className="modal-actions"><Button variant="ghost" onClick={onClose}>Close</Button><Button onClick={() => { onClose(); goApprovals(); }}>Open approval queue</Button></div>
  </Modal>;
}

function Modal({ title, subtitle, children, onClose, wide }: { title: string; subtitle: string; children: ReactNode; onClose: () => void; wide?: boolean }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><div className={`modal ${wide ? "modal--wide" : ""}`} role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal__head"><div><h2 id="modal-title">{title}</h2><p>{subtitle}</p></div><button className="icon-button" onClick={onClose} aria-label="Close dialog">×</button></div>{children}</div></div>;
}

const productPages = [
  ["01", "Product Overview", "Vision, users, principles and information architecture", "blueprint"],
  ["02", "Design System", "Tokens, typography, components and interaction states", "designSystem"],
  ["03", "Authentication & Onboarding", "Sign-in, recovery, access request and setup wizard", "onboarding"],
  ["04", "Home Dashboard", "Daily activity, readiness, quick actions and system states", "home"],
  ["05", "Students", "Directory, profile, editor and import validation", "students"],
  ["06", "Birthdays", "Calendar, queue, details and upcoming birthdays", "birthdays"],
  ["07", "Greeting Studio", "Template library, editor, composer and preview", "templates"],
  ["08", "Approvals", "Queue, review, confirmation, correction and audit", "approvals"],
  ["09", "Messaging & Delivery", "Provider readiness, timeline, failures and retries", "activity"],
  ["10", "Reports & Activity", "Sample analytics, filters and operational audit", "reports"],
  ["11", "Administration", "School, team, roles, integrations and security", "settings"],
  ["12", "Prototype Flows", "Six linked end-to-end product journeys", "prototype"],
  ["13", "Developer Handoff", "Inventory, specifications and dependency map", "handoff"],
] as const;

function Blueprint({ setScreen }: { setScreen: (s: Screen) => void }) {
  return <div className="page">
    <PageHeader eyebrow="Page 01 · Product overview" title="SBCS product blueprint" description="Every student celebrated. Every message reviewed. Every school in control.">
      <Button icon="arrow" onClick={() => setScreen("prototype")}>Open prototype flows</Button>
    </PageHeader>
    <section className="principles">
      {[["Thoughtful by default","Warm, personal communication without unnecessary administration."],["Human approval first","No policy-controlled greeting moves forward without an authorized reviewer."],["Honest system states","Approved, queued, sent, and delivered always remain distinct."],["Privacy through restraint","Only the minimum student information needed for the birthday use case."]].map((p,i) => <article key={p[0]}><span>0{i+1}</span><h2>{p[0]}</h2><p>{p[1]}</p></article>)}
    </section>
    <section className="panel page-inventory">
      <SectionTitle title="Pages 01–13" action="View handoff" onAction={() => setScreen("handoff")} />
      <p className="section-copy">Each page below is represented as an interactive coded prototype section. Backend-dependent actions remain explicitly simulated.</p>
      <div>{productPages.map((p) => <button key={p[0]} onClick={() => setScreen(p[3])}><span>{p[0]}</span><span><strong>{p[1]}</strong><small>{p[2]}</small></span><Badge tone={["02","03","04","05","06","08"].includes(p[0]) ? "gold" : "neutral"}>{["02","03","04","05","06","08"].includes(p[0]) ? "Priority" : "Covered"}</Badge><Icon name="chevron" size={17} /></button>)}</div>
    </section>
    <section className="panel ia-map">
      <SectionTitle title="Information architecture" />
      <div><span className="ia-root">SBCS workspace</span><Icon name="arrow" /><div>{["Access","Daily work","Student data","Greeting workflow","Operations","Administration"].map((group,i) => <article key={group}><strong>{group}</strong><small>{[["Sign-in","Recovery","Onboarding"],["Home","Notifications","Activity"],["Students","Imports","Birthdays"],["Templates","Composition","Approvals"],["Delivery","Reports","Audit"],["School","Team","Integrations"]][i].join(" · ")}</small></article>)}</div></div>
    </section>
  </div>;
}

function DesignSystem() {
  const swatches = [["Deep black","Application background","swatch-black"],["Charcoal","Primary surface","swatch-charcoal"],["Metallic silver","Primary neutral","swatch-silver"],["Gold","Primary action","swatch-gold"],["Purple","Supporting accent","swatch-purple"],["Success","Approved","swatch-success"],["Warning","Needs attention","swatch-warning"],["Danger","Failed / destructive","swatch-danger"]];
  return <div className="page">
    <PageHeader eyebrow="Page 02 · Design system" title="SBCS foundations" description="A restrained, accessible system for trustworthy school operations and warm celebrations."><Badge tone="gold">Priority deliverable</Badge></PageHeader>
    <section className="panel ds-section"><SectionTitle title="Color tokens" /><div className="swatch-grid">{swatches.map(s => <div key={s[0]}><i className={s[2]} /><span><strong>{s[0]}</strong><small>{s[1]}</small></span></div>)}</div></section>
    <div className="ds-columns">
      <section className="panel ds-section"><SectionTitle title="Typography" /><div className="type-specimen"><span className="eyebrow">Page eyebrow · DM Sans 10</span><h1>Page title · Manrope 34</h1><h2>Section heading · Manrope 15</h2><p>Body copy is calm, readable, and optimized for administrative workflows on mid-range Android devices.</p><small>Supporting text, timestamps, labels, and contextual details.</small></div></section>
      <section className="panel ds-section"><SectionTitle title="Spacing & shape" /><div className="token-list">{[["Space 1–2","4 / 8","Dense relationships"],["Space 3–4","12 / 16","Component interiors"],["Space 5–6","20 / 24","Sections and panels"],["Radius","8 / 12 / 18","Controls, cards, surfaces"],["Touch target","41 minimum","Primary interactive controls"]].map(t => <div key={t[0]}><strong>{t[0]}</strong><code>{t[1]}</code><small>{t[2]}</small></div>)}</div></section>
    </div>
    <section className="panel ds-section"><SectionTitle title="Buttons and states" /><div className="component-row"><Button>Primary action</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Quiet action</Button><Button variant="danger">Destructive</Button><Button disabled>Loading / disabled</Button></div></section>
    <section className="panel ds-section"><SectionTitle title="Status language" /><div className="component-row"><Badge tone="success">Approved</Badge><Badge tone="warning">Pending review</Badge><Badge tone="danger">Failed delivery</Badge><Badge tone="purple">Draft</Badge><Badge>Unavailable</Badge></div><p className="section-copy">Every state pairs color with explicit text and a meaningful indicator. Approval never uses delivery language.</p></section>
    <div className="ds-columns">
      <section className="panel ds-section"><SectionTitle title="Form controls" /><Field label="School email" placeholder="name@school.edu" required /><label className="field"><span>Role</span><select><option>School Administrator</option><option>Approver</option></select></label><label className="check-row"><input type="checkbox" /><span><strong>Explicit confirmation</strong><small>Use before consequential actions.</small></span></label></section>
      <section className="panel ds-section"><SectionTitle title="Feedback patterns" /><div className="notice"><Icon name="shield" /><span><strong>Informational notice</strong><small>Security and privacy context stays close to the action.</small></span></div><div className="warning-box"><Icon name="alert" /><span><strong>Action needs attention</strong><small>Plain language explains the next safe step.</small></span></div><div className="privacy-note"><Icon name="check" /><span><strong>Operation validated</strong><small>Success is never implied before confirmation.</small></span></div></section>
    </div>
  </div>;
}

function PrototypeFlows({ setScreen }: { setScreen: (s: Screen) => void }) {
  const flows: { code: string; title: string; detail: string; start: Screen; icon: IconName; steps: string[] }[] = [
    { code:"A", title:"Returning user", detail:"Daily birthday review", start:"home", icon:"home", steps:["Sign-in","Dashboard","Today’s birthdays","Student detail","Greeting preview","Approval queue"] },
    { code:"B", title:"Student import", detail:"Validated, explicit import", start:"students", icon:"file", steps:["Dashboard","Students","Import","Map columns","Validate","Confirm","Summary"] },
    { code:"C", title:"Message approval", detail:"Human review and audit", start:"approvals", icon:"check", steps:["Pending","Full preview","Context","Approve / reject","Confirmation","Activity"] },
    { code:"D", title:"Template creation", detail:"Safe placeholders", start:"templates", icon:"edit", steps:["Templates","Create","Edit","Sample preview","Validate","Save draft"] },
    { code:"E", title:"Failed delivery", detail:"Safe retry eligibility", start:"activity", icon:"alert", steps:["Activity","Failed item","Safe error","Eligibility","Retry blocked","Integrations"] },
    { code:"F", title:"School onboarding", detail:"Readiness before launch", start:"onboarding", icon:"shield", steps:["Invitation","Profile","Team","Import","Templates","Policy","Readiness"] },
  ];
  return <div className="page">
    <PageHeader eyebrow="Page 12 · Clickable prototype" title="End-to-end flows" description="Launch each journey from its realistic entry point. Interactions update only local prototype state."><Badge tone="warning">No backend actions</Badge></PageHeader>
    <div className="flow-grid">{flows.map(f => <article key={f.code}><div className="flow-head"><span className="flow-code">{f.code}</span><span className="feature-icon"><Icon name={f.icon} /></span></div><h2>{f.title}</h2><p>{f.detail}</p><div className="flow-steps">{f.steps.map((s,i) => <span key={s}>{s}{i < f.steps.length-1 && <Icon name="chevron" size={12} />}</span>)}</div><Button onClick={() => setScreen(f.start)}>Launch flow {f.code}<Icon name="arrow" size={16} /></Button></article>)}</div>
    <div className="notice prototype-note"><Icon name="shield" /><span><strong>Prototype boundary</strong><small>Clickable interactions demonstrate intent and state transitions. They are not evidence of authentication, persistence, authorization, delivery, or integration readiness.</small></span></div>
  </div>;
}

function Onboarding({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [step, setStep] = useState(1);
  const steps = ["School profile","Invite staff","Greeting template","Student data","Channels","Approval rules","Sample review","Readiness"];
  return <div className="page onboarding-page">
    <button className="back-button" onClick={() => setScreen("prototype")}>‹ Leave and resume later</button>
    <PageHeader eyebrow="Page 03 · First-time onboarding" title={steps[step-1]} description={`Step ${step} of 8 · Configuration is saved only in local prototype state.`}><Badge tone="warning">Prototype setup</Badge></PageHeader>
    <div className="onboarding-layout">
      <aside className="panel onboarding-nav">{steps.map((s,i) => <button key={s} className={step === i+1 ? "active" : step > i+1 ? "complete" : ""} onClick={() => setStep(i+1)}><span>{step > i+1 ? "✓" : i+1}</span><strong>{s}</strong></button>)}</aside>
      <section className="panel onboarding-content">
        {step === 1 && <><h2>Confirm school identity</h2><p>Review the details used in greetings and administrative communication.</p><div className="form-grid"><Field label="School name" placeholder="BlueHaven Academy" required /><Field label="Time zone" placeholder="Africa/Lagos (WAT)" required /><Field label="Official email" placeholder="admin@school.example" required /><Field label="Location" placeholder="Lagos, Nigeria" /></div></>}
        {step === 2 && <><h2>Invite authorized staff</h2><p>Start with the smallest team needed. Permissions require backend enforcement.</p><div className="form-grid"><Field label="Work email" placeholder="reviewer@school.example" required /><Field label="Role" placeholder="Approver" required /></div><div className="notice"><Icon name="shield" /><span><strong>Invitation does not grant unrestricted access</strong><small>An owner must approve role assignment and the recipient must securely accept.</small></span></div></>}
        {step === 3 && <><h2>Choose a starting template</h2><p>School-specific templates can be refined before use.</p><div className="selection-cards"><button className="selected"><Icon name="message" /><strong>Warm school greeting</strong><small>Friendly and suitable for most classes</small></button><button><Icon name="file" /><strong>Formal greeting</strong><small>Traditional school communication</small></button></div></>}
        {step === 4 && <><h2>Select an approved data method</h2><p>No student data is transmitted until validation and explicit confirmation.</p><div className="selection-cards"><button className="selected"><Icon name="file" /><strong>CSV import</strong><small>Available in this prototype</small></button><button><Icon name="plug" /><strong>School system</strong><small>Requires external configuration</small></button></div></>}
        {step === 5 && <><h2>Communication channels</h2><p>Connections cannot be completed in this prototype.</p><IntegrationStatus icon="mail" title="Email provider" /><IntegrationStatus icon="message" title="WhatsApp provider" /></>}
        {step === 6 && <><h2>Human approval policy</h2><p>Every greeting requires review before delivery can be considered.</p><label className="check-row"><input type="checkbox" defaultChecked /><span><strong>Require one authorized approver</strong><small>Editing after approval invalidates the approval.</small></span></label><label className="check-row"><input type="checkbox" /><span><strong>Require a second approver</strong><small>Optional additional oversight for this school.</small></span></label></>}
        {step === 7 && <><h2>Review a sample greeting</h2><p>Sample data never exposes a real student.</p><div className="message-preview compact-preview"><span className="eyebrow">Fictional sample</span><h3>Happy birthday, Amina!</h3><p>Your curiosity and bright spirit make our school community better.</p></div></>}
        {step === 8 && <><h2>Readiness checklist</h2><p>Complete external dependencies before any real launch.</p><div className="readiness onboarding-readiness"><div><span><Icon name="check" /><strong>School profile</strong></span><Badge tone="success">Ready</Badge></div><div><span><Icon name="check" /><strong>Approval policy</strong></span><Badge tone="success">Ready</Badge></div><div><span><Icon name="users" /><strong>Student source</strong></span><Badge tone="warning">Demo only</Badge></div><div><span><Icon name="plug" /><strong>Delivery providers</strong></span><Badge tone="danger">Not connected</Badge></div></div></>}
        <div className="wizard-actions"><Button variant="ghost" disabled={step === 1} onClick={() => setStep(step-1)}>Previous</Button><Button onClick={() => step < 8 ? setStep(step+1) : setScreen("home")}>{step === 8 ? "Enter demo dashboard" : "Save & continue"}<Icon name="arrow" size={16} /></Button></div>
      </section>
    </div>
  </div>;
}

function IntegrationStatus({ icon, title }: { icon: IconName; title: string }) {
  return <div className="integration-status"><span className="feature-icon"><Icon name={icon} /></span><span><strong>{title}</strong><small>Secure backend credentials and provider verification required</small></span><Badge tone="danger">Not connected</Badge></div>;
}

function SystemStates({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [tab, setTab] = useState<"notifications" | "states" | "privacy">("notifications");
  const [read, setRead] = useState<string[]>([]);
  const notifications = [
    ["review","New greeting awaiting review","A fictional greeting for Amina Yusuf was submitted by M. Okeke.","5 minutes ago","purple","approvals"],
    ["birthday","Three birthdays are approaching","Preparation is still needed for one fictional student.","2 hours ago","gold","birthdays"],
    ["delivery","Delivery provider disconnected","No messages can be queued until an authorized administrator reconnects a provider.","Yesterday","danger","integrations"],
    ["import","Student import validation complete","122 fictional rows passed validation; six need review.","12 May","success","students"],
    ["security","New account sign-in","A demonstration security event was recorded. No real account was accessed.","11 May","warning","settings"],
  ] as const;
  const states = [
    ["No internet connection","Your changes have not been submitted. Check your connection and try again.","Retry","alert"],
    ["Session expired","For your protection, sign in again to continue. Unsaved sensitive actions were cancelled.","Return to sign in","shield"],
    ["Permission denied","Your role does not allow this action. Ask a school owner if your responsibilities changed.","View access policy","shield"],
    ["No birthdays today","There are no birthdays scheduled for today. You can review the upcoming queue instead.","View upcoming","cake"],
    ["No pending approvals","Everything submitted has been reviewed. New items will appear here automatically.","View history","check"],
    ["Provider authentication expired","An authorized administrator must reconnect the provider. No messages will be retried automatically.","Review integration","plug"],
    ["Retry already in progress","A safe retry is underway. Starting another could create a duplicate delivery.","View delivery","clock"],
    ["School account suspended","Workspace access is temporarily unavailable. Contact an authorized school owner or support.","Contact support","alert"],
  ] as const;
  return <div className="page">
    <PageHeader eyebrow="Privacy, notifications & resilient states" title="Trust center" description="Security-conscious communication, clear recovery paths, and no sensitive payloads in alerts."><Badge tone="gold">Fictional prototype</Badge></PageHeader>
    <div className="status-tabs trust-tabs">{[["notifications","Notifications"],["states","System states"],["privacy","Privacy controls"]].map(t => <button key={t[0]} className={tab === t[0] ? "active" : ""} onClick={() => setTab(t[0] as typeof tab)}>{t[1]}</button>)}</div>
    {tab === "notifications" && <section className="panel notification-center">
      <div className="notification-head"><div><h2>In-app notifications</h2><p>Records contain only the context needed to take action.</p></div><button onClick={() => setRead(notifications.map(n => n[0]))}>Mark all as read</button></div>
      <div>{notifications.map(n => <button key={n[0]} className={read.includes(n[0]) ? "read" : ""} onClick={() => { setRead([...read,n[0]]); setScreen(n[5]); }}><span className={`notification-mark ${n[4]}`}><Icon name={n[0] === "delivery" ? "alert" : n[0] === "birthday" ? "cake" : n[0] === "security" ? "shield" : "bell"} /></span><span><strong>{n[1]}</strong><small>{n[2]}</small></span><time>{n[3]}</time>{!read.includes(n[0]) && <i />}</button>)}</div>
    </section>}
    {tab === "states" && <div className="state-gallery">{states.map(s => <article className="panel" key={s[0]}><span className="feature-icon"><Icon name={s[3] as IconName} /></span><h2>{s[0]}</h2><p>{s[1]}</p><Button variant="secondary">{s[2]}</Button></article>)}</div>}
    {tab === "privacy" && <div className="privacy-layout">
      <section className="panel"><SectionTitle title="Student data minimization" /><div className="policy-list">{[["Birthday visibility","Month and day only for Greeting Editors","success"],["Student directory","ID, class, birthday, and active status","success"],["Recipient details","Masked unless operationally required","success"],["Profile images","Optional and school-approved only","warning"],["Analytics events","No student names or message bodies","success"]].map(p => <div key={p[0]}><span><strong>{p[0]}</strong><small>{p[1]}</small></span><Badge tone={p[2]}>{p[2] === "success" ? "Protected" : "Optional"}</Badge></div>)}</div></section>
      <section className="panel"><SectionTitle title="Retention & access" /><div className="policy-list">{[["Imported files","Delete after validated processing"],["Audit history","School policy and legal review required"],["Deactivated students","Restrict visibility; follow approved retention"],["Message exports","Authorized roles only; log every export"],["Support access","Time-limited, approved, and audited"]].map(p => <div key={p[0]}><span><strong>{p[0]}</strong><small>{p[1]}</small></span><Icon name="chevron" size={16} /></div>)}</div><div className="approval-note"><Icon name="alert" /><p>These interface controls do not establish legal compliance. Production requires privacy, security, and legal review.</p></div></section>
    </div>}
  </div>;
}

function Handoff({ setScreen }: { setScreen: (s: Screen) => void }) {
  return <div className="page">
    <PageHeader eyebrow="Page 13 · Developer handoff" title="Implementation map" description="Prototype specifications and dependencies to review before production code or backend integration."><Button onClick={() => setScreen("prototype")}>Test flows first</Button></PageHeader>
    <div className="handoff-grid">{[
      ["Screen inventory","13 organized product pages","All priority mobile screens represented"],
      ["Component inventory","Buttons, fields, badges, rows, panels, dialogs, navigation","Variants include focus, selected, disabled, success, invalid and destructive"],
      ["Responsive behavior","Mobile bottom navigation; desktop sidebar","No routine horizontal scrolling; safe-area aware"],
      ["Accessibility","Visible focus, explicit labels, reduced motion","Target WCAG 2.2 AA during implementation review"],
      ["Data contract","Fictional local adapter only","No endpoint is claimed or called"],
      ["Outstanding decisions","Auth provider, tenant model, email and WhatsApp providers","Security, privacy and legal review required"],
    ].map(i => <article className="panel" key={i[0]}><span className="eyebrow">{i[0]}</span><h2>{i[1]}</h2><p>{i[2]}</p></article>)}</div>
    <section className="panel dependency"><SectionTitle title="API dependency map" /><div className="dependency-grid">{[["Authentication","Sessions, recovery, invitations"],["School tenancy","Membership, roles, isolation"],["Student records","CRUD, imports, duplicate checks"],["Greetings","Persistence, validation, versioning"],["Approvals","Transitions, authorization, audit"],["Messaging","Queue, callbacks, safe retries"],["Operations","Monitoring, backups, retention"],["Security","Reauthentication, revocation, exports"],["Notifications","In-app events and deep links"]].map(d => <div key={d[0]}><span className="feature-icon"><Icon name="plug" /></span><span><strong>{d[0]}</strong><small>{d[1]}</small></span><Badge tone="warning">Backend required</Badge></div>)}</div></section>
  </div>;
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<"signin" | "recovery" | "access">("signin");
  const [notice, setNotice] = useState("");
  const [password, setPassword] = useState("prototype");
  const [authError, setAuthError] = useState("");
  function submit(e: FormEvent) {
    e.preventDefault();
    if (password === "invalid") {
      setAuthError("The email or password could not be verified. Try again or recover your account.");
      return;
    }
    onLogin();
  }
  return <div className="auth-shell">
    <div className="auth-brand-panel"><Brand /><div><span className="eyebrow">Student Birthday Celebration System</span><h1>Every student celebrated.<br />Every school in control.</h1><p>Personalized greetings, school-approved templates, and a human review process — thoughtfully organized.</p></div><blockquote>“Creativity Beyond Limits”<small>BlueHaven Studios</small></blockquote></div>
    <main className="auth-main"><div className="auth-card"><div className="mobile-auth-brand"><Brand /></div><span className="demo-pill"><span /> Interactive prototype</span><h2>{mode === "recovery" ? "Recover your account" : mode === "access" ? "Request school access" : "Welcome back"}</h2><p>{mode === "recovery" ? "Enter your school email. This prototype will not send an email." : mode === "access" ? "Requests are reviewed by an authorized school owner. Access is never granted automatically." : "Sign in to your school's birthday workspace."}</p>
      {notice && <div className="success-notice"><Icon name="check" /><span><strong>Request recorded for demonstration</strong><small>No account lookup or email was performed.</small></span></div>}
      {authError && <div className="auth-error" role="alert"><Icon name="alert" /><span><strong>Unable to sign in</strong><small>{authError}</small></span></div>}
      {!notice && <form onSubmit={mode === "signin" ? submit : (e) => { e.preventDefault(); setNotice(mode); }}>
        {mode === "access" && <><Field label="School name" placeholder="Official school name" required /><Field label="Contact person" placeholder="Full name" required /></>}
        <label className="field"><span>{mode === "access" ? "Official school email" : "School email address"}</span><input type="email" placeholder="name@school.edu" required defaultValue={mode === "signin" ? "admin@bluehaven.demo" : ""} /></label>
        {mode === "access" && <><Field label="Role" placeholder="e.g. School Administrator" required /><Field label="School location" placeholder="City, country" required /><label className="check-row"><input type="checkbox" required /><span><strong>I consent to being contacted</strong><small>This does not create an account or grant access.</small></span></label></>}
        {mode === "signin" && <label className="field"><span>Password</span><input type="password" placeholder="Enter your password" required value={password} onChange={(e) => { setPassword(e.target.value); setAuthError(""); }} aria-invalid={Boolean(authError)} /><small>Use “invalid” to preview the error state; any other value enters the demo.</small></label>}
        {mode === "signin" && <div className="form-options"><label><input type="checkbox" />Keep me signed in</label><button type="button" onClick={() => setMode("recovery")}>Forgot password?</button></div>}
        <Button type="submit">{mode === "recovery" ? "Preview recovery state" : mode === "access" ? "Submit access request" : "Enter demo workspace"}<Icon name="arrow" size={17} /></Button>
      </form>}
      {(mode !== "signin" || notice) && <button className="back-link" onClick={() => { setMode("signin"); setNotice(""); }}>← Return to sign in</button>}
      {mode === "signin" && !notice && <div className="access-links"><button onClick={() => setMode("access")}>Request school access</button><span>·</span><button>Contact support</button></div>}
      <div className="trust-note"><Icon name="shield" /><p>Every birthday message follows your school's configured human approval process. Access must be authorized by your school.</p></div>
      <small className="legal">Prototype only · Fictional data · No backend connected<br />Privacy notice · Security information</small>
    </div></main>
  </div>;
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState<Screen>("home");
  const [studentOpen, setStudentOpen] = useState(false);
  const [toast, setToast] = useState("");
  function showToast(message: string) { setToast(message); window.setTimeout(() => setToast(""), 3800); }
  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;
  let content: ReactNode;
  if (screen === "blueprint") content = <Blueprint setScreen={setScreen} />;
  else if (screen === "designSystem") content = <DesignSystem />;
  else if (screen === "prototype") content = <PrototypeFlows setScreen={setScreen} />;
  else if (screen === "handoff") content = <Handoff setScreen={setScreen} />;
  else if (screen === "onboarding") content = <Onboarding setScreen={setScreen} />;
  else if (screen === "systemStates") content = <SystemStates setScreen={setScreen} />;
  else if (screen === "home") content = <Dashboard setScreen={setScreen} openStudent={() => setStudentOpen(true)} />;
  else if (screen === "birthdays") content = <Birthdays setScreen={setScreen} openStudent={() => setStudentOpen(true)} />;
  else if (screen === "students") content = <Students onToast={showToast} />;
  else if (screen === "approvals") content = <Approvals onToast={showToast} />;
  else if (screen === "templates") content = <Templates onToast={showToast} />;
  else if (screen === "activity") content = <Activity onToast={showToast} />;
  else if (screen === "reports") content = <Reports />;
  else if (screen === "integrations") content = <Integrations />;
  else if (screen === "team") content = <Team />;
  else content = <Settings />;
  return <AppShell screen={screen} setScreen={setScreen} onSignOut={() => setLoggedIn(false)}>
    {content}
    {studentOpen && <StudentDetail onClose={() => setStudentOpen(false)} goApprovals={() => setScreen("approvals")} />}
    {toast && <div className="toast" role="status"><Icon name="check" /><span>{toast}</span><button onClick={() => setToast("")}>×</button></div>}
  </AppShell>;
}
