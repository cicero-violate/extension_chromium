import {
    bi as y,
    R as r,
    D as m,
    yF as C,
    yG as h
} from "./4813494d-javwxs2rmzsrunl2.js";
import {
    h_ as l,
    h$ as g
} from "./1a7ebd5f-csmwtrlxfshzkvs8.js";
import {
    W as k,
    a as R,
    b as q
} from "./b4c3a217-wf4fzdto4ed5hgv0.js";
var T = (s => (s.NON_TERMINAL_TURN = "non_terminal_turn", s.REPO_NOT_INITIALIZED = "repo_not_initialized", s.ENVIRONMENT_MISSING = "environment_missing", s.ENVIRONMENT_INVALID_EMAIL = "environment_invalid_email", s.ENVIRONMENT_STALE_UPDATE = "environment_stale_update", s.ENVIRONMENT_REPO_ACCESS_FAILED = "environment_repo_access_failed", s.REPO_NOT_ACCESSIBLE = "repo_not_accessible", s.MISSING_GITHUB_CONNECTOR_LINK = "missing_github_connector_link", s.BRANCH_CREATION_NOT_ALLOWED = "branch_creation_not_allowed", s.PULL_REQUEST_NOT_ALLOWED = "pull_request_not_allowed", s.VERIFIED_COMMITS_REQUIRED = "verified_commits_required", s.BINARY_FILES_NOT_SUPPORTED = "binary_files_not_supported", s.COMMIT_PATTERN_REQUIRED = "commit_pattern_required", s.PULL_REQUEST_NOT_FOUND_ON_TASK = "pull_request_not_found_on_task", s.PULL_REQUEST_UPDATED_OUTSIDE_OF_CODEX = "pull_request_updated_outside_of_codex", s.PULL_REQUEST_NOT_OPEN = "pull_request_not_open", s.BRANCH_NO_LONGER_EXISTS = "branch_no_longer_exists", s.RATE_LIMIT_EXCEEDED = "rate_limit_exceeded", s))(T || {});

function U(s, e, t, a) {
    switch (s.type) {
        case "repo_not_accessible":
            a.danger(t.formatMessage({
                id: "wham.whamComposer.repoNotAccessible",
                defaultMessage: "Can’t access GitHub repository. Verify your repository access on GitHub, or reconnect your GitHub account in Codex Settings."
            }), {
                id: e,
                duration: 10,
                hasCloseButton: !0,
                loggingTitle: "Can't access GitHub repository. Verify your repository access on GitHub, or reconnect your GitHub account in Codex Settings."
            });
            return;
        case "missing_github_connector_link":
            a.danger(t.formatMessage({
                id: "wham.whamComposer.missingGithubConnectorLink",
                defaultMessage: "No GitHub connection. Please reconnect your GitHub account in Codex Settings."
            }), {
                id: e,
                duration: 10,
                hasCloseButton: !0,
                loggingTitle: "No GitHub connection. Please reconnect your GitHub account in Codex Settings."
            });
            return;
        case "non_terminal_turn":
            a.danger(t.formatMessage({
                id: "wham.whamComposer.nonTerminalTurn",
                defaultMessage: "Task already has a running turn"
            }), {
                id: e,
                duration: 10,
                hasCloseButton: !0,
                loggingTitle: "Task already has a running turn"
            });
            return;
        case "repo_not_initialized":
            a.danger(t.formatMessage({
                id: "wham.whamComposer.repoNotInitialized",
                defaultMessage: "GitHub Repository must be initialized to be used within Codex"
            }), {
                id: e,
                duration: 10,
                hasCloseButton: !0,
                loggingTitle: "GitHub Repository must be initialized to be used within Codex"
            });
            return;
        case "environment_invalid_email":
            {
                const n = (Array.isArray(s.payload.invalid_emails) ? s.payload.invalid_emails : []).join(", "),
                    o = n ? t.formatMessage({
                        id: "wham.whamRequests.environmentInvalidEmailWithList",
                        defaultMessage: "Some share target emails aren't part of this workspace: {emails}"
                    }, {
                        emails: n
                    }) : t.formatMessage({
                        id: "wham.whamRequests.environmentInvalidEmailBase",
                        defaultMessage: "Some share target emails aren't part of this workspace. Update the list and try again."
                    });a.danger(o, {
                    id: e,
                    duration: 8,
                    hasCloseButton: !0,
                    loggingTitle: n ? `Invalid workspace emails: ${n}` : "Stale environment update"
                });
                return
            }
        case "environment_stale_update":
            a.danger(t.formatMessage({
                id: "wham.whamRequests.environmentStaleUpdate",
                defaultMessage: "This environment changed while you were editing. Refresh and try again."
            }), {
                id: e,
                duration: 8,
                hasCloseButton: !0,
                loggingTitle: "This environment changed while you were editing. Refresh and try again."
            });
            return;
        case "environment_repo_access_failed":
            a.danger(t.formatMessage({
                id: "wham.whamRequests.environmentRepoAccessFailed",
                defaultMessage: "Codex can’t access this GitHub repository. Check the repository’s Codex installation and permissions, then try again."
            }), {
                id: e,
                duration: 8,
                hasCloseButton: !0,
                loggingTitle: "Codex can’t access this GitHub repository. Check the repository’s Codex installation and permissions, then try again."
            });
            return;
        case "branch_creation_not_allowed":
            a.danger(t.formatMessage({
                id: "wham.whamComposer.branchCreationNotAllowed",
                defaultMessage: "Branch creation unauthorized for this repository. Please check your GitHub permissions."
            }), {
                loggingTitle: "Branch creation unauthorized for this repository. Please check your GitHub permissions."
            });
            return;
        case "pull_request_not_allowed":
            a.danger(t.formatMessage({
                id: "wham.whamComposer.pullRequestNotAllowed",
                defaultMessage: "Repository does not allow pull requests from Codex. Please check your GitHub permissions."
            }), {
                loggingTitle: "Repository does not allow pull requests from Codex. Please check your GitHub permissions."
            });
            return;
        case "verified_commits_required":
            a.danger(t.formatMessage({
                id: "wham.whamComposer.verifiedCommitsRequired",
                defaultMessage: "Codex does not currently support PRs in repositories that require verified commits"
            }), {
                loggingTitle: "Codex does not currently support PRs in repositories that require verified commits"
            });
            return;
        case "binary_files_not_supported":
            a.danger(t.formatMessage({
                id: "wham.whamComposer.binaryFilesNotSupported",
                defaultMessage: "Binary files are not supported"
            }), {
                id: e,
                duration: 10,
                hasCloseButton: !0
            });
            return;
        case "commit_pattern_required":
            a.danger(t.formatMessage({
                id: "wham.whamComposer.commitPatternRequired",
                defaultMessage: "Commit message must match a given regex pattern"
            }), {
                id: e,
                duration: 10,
                hasCloseButton: !0
            });
            return;
        case "pull_request_updated_outside_of_codex":
            a.danger(t.formatMessage({
                id: "wham.whamComposer.pullRequestUpdatedOutsideOfCodex",
                defaultMessage: "Codex does not currently support updating PRs that are updated outside of Codex. For now, please create a new PR."
            }), {
                id: e,
                duration: 10,
                hasCloseButton: !0
            });
            return;
        case "pull_request_not_open":
            a.danger(t.formatMessage({
                id: "wham.whamComposer.pullRequestNotOpen",
                defaultMessage: "Pull request is no longer open. Refreshing status…"
            }), {
                id: e,
                duration: 10,
                hasCloseButton: !0
            });
            return;
        case "branch_no_longer_exists":
            a.danger(t.formatMessage({
                id: "wham.whamComposer.branchNoLongerExists",
                defaultMessage: "Existing PR branch appears to no longer exist. Please create a new PR."
            }), {
                id: e,
                duration: 10,
                hasCloseButton: !0
            });
            return;
        case "pull_request_not_found_on_task":
            a.danger(t.formatMessage({
                id: "wham.whamComposer.pullRequestNotFoundOnTask",
                defaultMessage: "Pull request not found for task"
            }), {
                id: e,
                duration: 10,
                hasCloseButton: !0,
                loggingTitle: "Binary files are not supported"
            });
            return;
        default:
            return a.danger(s.payload.message, {
                id: e,
                duration: 5,
                hasCloseButton: !0
            }), null
    }
}
class b extends y {
    type;
    payload;
    constructor(e, t, a, i, n) {
        super(e.message, t, a, i, n), this.type = e.type, this.payload = e
    }
}

function E(s) {
    const e = s.detail;
    if (e && typeof e.type == "string" && typeof e.message == "string") {
        const t = {
            type: e.type,
            message: e.message
        };
        throw Object.entries(e).forEach(([a, i]) => {
            a === "type" || a === "message" || (t[a] = i)
        }), new b(t, s.status, {}, s.requestId, s.rawError)
    }
    throw s
}
class f {
    static async _wrapWhamRequest(e) {
        try {
            return await e()
        } catch (t) {
            throw t instanceof y && E(t), t
        }
    }
    static getTasks(e = 10, t = null, a = "current") {
        return this._wrapWhamRequest(() => r.safeGet("/wham/tasks", {
            parameters: {
                query: {
                    limit: e,
                    cursor: t,
                    task_filter: a
                }
            }
        }))
    }
    static getTasksForList(e = 10, t = null, a = "current") {
        return this._wrapWhamRequest(() => r.safeGet("/wham/tasks/list", {
            parameters: {
                query: {
                    limit: e,
                    cursor: t,
                    task_filter: a
                }
            }
        }))
    }
    static searchTasks(e, t = 10, a = null) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/tasks/search", {
            parameters: {
                query: {
                    query: e,
                    limit: t,
                    cursor: a
                }
            }
        }))
    }
    static getTaskDetails(e) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/tasks/{task_id}", {
            parameters: {
                path: {
                    task_id: e
                }
            }
        }))
    }
    static getTaskTurnPR(e, t) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/tasks/{task_id}/turns/{task_turn_id}/pr", {
            parameters: {
                path: {
                    task_id: e,
                    task_turn_id: t
                }
            }
        }))
    }
    static getUserHandle() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/task_suggestions/github/user_handle", {}))
    }
    static getTaskTurn(e, t) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/tasks/{task_id}/turns/{task_turn_id}", {
            parameters: {
                path: {
                    task_id: e,
                    task_turn_id: t
                }
            }
        }))
    }
    static getRateLimitStatus() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/usage", {}))
    }
    static getDailyTokenUsageBreakdown() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/usage/daily-token-usage-breakdown", {}))
    }
    static getDailyEnterpriseTokenUsageBreakdown() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/usage/daily-enterprise-token-usage-breakdown", {}))
    }
    static getCreditUsageEvents() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/usage/credit-usage-events", {}))
    }
    static getLatestTaskTurns(e, t) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/tasks/{task_id}/turns/{task_turn_id}/latest_turn", {
            parameters: {
                path: {
                    task_id: e,
                    task_turn_id: t
                }
            }
        }))
    }
    static getGithubInstallations() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/github/installations", {}))
    }
    static getGithubInstallationsV2() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/github/installations/v2", {}))
    }
    static getGithubInstallationEvents() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/github/installations/events", {}))
    }
    static getGithubInstallationEventsV2() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/github/installations/events/v2", {}))
    }
    static feedback({
        thumbRating: e,
        text: t,
        taskId: a,
        turnId: i,
        shareUrl: n,
        pullRequestUrl: o,
        category: _
    }) {
        return this._wrapWhamRequest(() => r.safePost("/wham/feedback", {
            requestBody: {
                thumb_rating: e,
                text: t,
                conversation_id: null,
                message_id: null,
                task_id: a,
                turn_id: i,
                share_url: n,
                pull_request_url: o,
                category: _
            }
        }))
    }
    static archiveTask(e) {
        return this._wrapWhamRequest(() => r.safePost("/wham/tasks/{task_id}/archive", {
            parameters: {
                path: {
                    task_id: e
                }
            }
        }))
    }
    static recoverTask(e) {
        return this._wrapWhamRequest(() => r.safePost("/wham/tasks/{task_id}/recover", {
            parameters: {
                path: {
                    task_id: e
                }
            }
        }))
    }
    static updatePr(e, t, a) {
        return this._wrapWhamRequest(() => r.safePatch("/wham/tasks/{task_id}/turns/{task_turn_id}/pr/{pr_id}", {
            parameters: {
                path: {
                    task_id: e,
                    task_turn_id: t,
                    pr_id: a
                }
            }
        }))
    }
    static createPr(e, t, a, i) {
        return this._wrapWhamRequest(() => r.safePost("/wham/tasks/{task_id}/turns/{task_turn_id}/pr", {
            parameters: {
                path: {
                    task_id: e,
                    task_turn_id: t
                }
            },
            requestBody: {
                mode: a,
                add_codex_tag: i
            }
        }))
    }
    static getRepositoriesByInstallationId(e, t, a) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/github/repositories/v2/{installation_id}", {
            parameters: {
                path: {
                    installation_id: e
                },
                query: {
                    page: t,
                    per_page: a
                }
            }
        }))
    }
    static searchRepositories(e) {
        const t = { ...e,
            per_page: e.per_page ? ? 20,
            page: e.page ? ? 1
        };
        return this._wrapWhamRequest(() => r.safeGet("/wham/github/repositories/search", {
            parameters: {
                query: t
            }
        }))
    }
    static searchRepositoriesAllInstallations(e) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/github/repositories/search/all-installations", {
            parameters: {
                query: { ...e,
                    page: e.page ? ? 1
                }
            }
        }))
    }
    static listRepositories(e) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/github/list-repositories", {
            parameters: {
                query: e
            }
        }))
    }
    static getSampleTasks(e = 20, t = null) {
        return this._wrapWhamRequest(() => r.safeGet("/share/codex/task_samples", {
            parameters: {
                query: {
                    limit: e,
                    cursor: t
                }
            }
        }))
    }
    static getRepository(e) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/github/repositories/{repo_id}", {
            parameters: {
                path: {
                    repo_id: e
                }
            }
        }))
    }
    static getUserPullRequests(e, {
        limit: t = 20,
        state: a = "open",
        includeDiff: i = !1,
        includeComments: n = !1
    } = {}) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/github/repositories/{repo_id}/pull-requests", {
            parameters: {
                path: {
                    repo_id: e
                },
                query: {
                    limit: t,
                    state: a,
                    include_diff: i,
                    include_comments: n
                }
            }
        }))
    }
    static searchBranchesByRepository(e, t, a = 10, i = null) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/github/branches/{repo_id}/search", {
            parameters: {
                path: {
                    repo_id: e
                },
                query: {
                    query: t,
                    page_size: a,
                    cursor: i
                }
            }
        }))
    }
    static getEnvironmentWithCreatorAndMachine(e) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/environments/{environment_id}/with-creator-and-machine", {
            parameters: {
                path: {
                    environment_id: e
                }
            }
        }))
    }
    static getEnvironmentWithCreators(e = 10, t = null, a = !1) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/environments/with-creators", {
            parameters: {
                query: {
                    limit: e,
                    cursor: t,
                    enforce_repo_access: a
                }
            }
        }))
    }
    static updateEnvironment(e, t) {
        return this._wrapWhamRequest(() => r.safePatch("/wham/environments/{environment_id}", {
            parameters: {
                path: {
                    environment_id: e
                }
            },
            requestBody: t
        }))
    }
    static deleteEnvironment(e) {
        return this._wrapWhamRequest(() => r.safeDelete("/wham/environments/{environment_id}", {
            parameters: {
                path: {
                    environment_id: e
                }
            }
        }))
    }
    static getEnvironments() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/environments", {}))
    }
    static getRecentEnvironments() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/environments/recent", {}))
    }
    static getMachines() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/machines", {}))
    }
    static createEnvironment(e) {
        const t = e.envVars.reduce((u, c) => (u[c.key] = c.value, u), {}),
            a = e.secrets.some(u => u.domain !== void 0 && u.domain !== null && u.domain !== ""),
            i = a ? void 0 : e.secrets.reduce((u, c) => (u[c.key] = c.value, u), {}),
            n = a ? e.secrets.map(u => ({
                name: u.key,
                domain: u.domain || null,
                value: u.value
            })) : void 0,
            o = e.share_targets ? .map(u => u.trim()) ? .filter(Boolean),
            _ = e.share_settings === "private" ? [] : o ? .map(u => ({
                email: u,
                permission: "editor",
                type: "user"
            })),
            d = e.enableAuthtranslator;
        return this._wrapWhamRequest(() => r.safePost("/wham/environments", {
            requestBody: {
                label: e.label,
                machine_id: e.machine,
                repos: [e.repositoryId],
                description: e.description,
                setup: e.setupCommands,
                maintenance_setup: e.maintenanceSetupCommands,
                workspace_dir: e.workspaceDirectory,
                agent_network_access: e.agentNetworkAccess,
                codex_github_direct: e.codexGithubDirect,
                share_settings: e.share_settings,
                share_targets: _,
                env_vars: t,
                ...n ? {
                    secrets_with_domains: n
                } : i ? {
                    secrets: i
                } : {},
                ...d !== void 0 ? {
                    enable_authtranslator: d
                } : {},
                auto_setup_settings: e.autoSetupSettings,
                cache_settings: e.cacheSettings
            }
        }))
    }
    static runEnvironmentTestCommand(e) {
        return this._wrapWhamRequest(() => r.safePost("/wham/environments/test/{test_session_id}/command", {
            parameters: {
                path: {
                    test_session_id: e.testSessionId
                }
            },
            requestBody: {
                command: e.command
            }
        }))
    }
    static getUserPreferences() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/settings/user", {}))
    }
    static getUserPreferencesConfig() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/settings/configs/user-preferences", {}))
    }
    static listRequirementsFiles() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/config/requirements/groups", {}))
    }
    static listWorkspaceGroups(e) {
        return this._wrapWhamRequest(async () => {
            const t = [];
            let i = 0;
            for (;;) {
                const n = await r.safeGet("/accounts/{account_id}/groups", {
                    parameters: {
                        path: {
                            account_id: e
                        },
                        query: {
                            offset: i,
                            limit: 100,
                            orderby: "created_time desc",
                            include_scim_groups: !0
                        }
                    }
                });
                if (t.push(...n.items), n.items.length === 0 || t.length >= n.total) break;
                i += n.items.length
            }
            return t
        })
    }
    static findWorkspaceUserByEmail(e, t) {
        return this._wrapWhamRequest(async () => {
            const a = t.trim().toLowerCase();
            return a ? (await r.safeGet("/accounts/{account_id}/users", {
                parameters: {
                    path: {
                        account_id: e
                    },
                    query: {
                        query: a,
                        offset: 0,
                        limit: 25
                    }
                }
            })).items.find(n => (n.email ? ? "").toLowerCase() === a) ? ? null : null
        })
    }
    static listWorkspaceUserGroups(e, t) {
        return this._wrapWhamRequest(async () => (await r.safeGet("/accounts/{account_id}/users/{account_user_id}/groups", {
            parameters: {
                path: {
                    account_id: e,
                    account_user_id: t
                }
            }
        })).items)
    }
    static updateRequirementsFiles(e) {
        return this._wrapWhamRequest(() => r.safePut("/wham/config/requirements/groups", {
            requestBody: {
                files: e
            }
        }))
    }
    static getCodeReviewRepositories({
        page: e = 1,
        perPage: t = 100,
        search: a,
        nextToken: i
    }) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/settings/code_review", {
            parameters: {
                query: {
                    page: e,
                    per_page: t,
                    search: a,
                    next_token: i
                }
            }
        }))
    }
    static searchCodeReviewRepositories({
        query: e,
        limit: t,
        installationIds: a,
        page: i
    }) {
        return this._wrapWhamRequest(async () => await r.safeGet("/wham/settings/code_review_search", {
            parameters: {
                query: {
                    query: e,
                    limit: t,
                    installation_ids: a,
                    page: i ? ? 1
                }
            }
        }))
    }
    static getCodeReviewRepository(e, t) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/settings/code_review/{repo_id}", {
            parameters: {
                path: {
                    repo_id: `${e}-${t}`
                }
            }
        }))
    }
    static updateCodeReviewRepositories(e) {
        return this._wrapWhamRequest(() => r.safePatch("/wham/settings/code_review", {
            requestBody: e
        }))
    }
    static updateUserPreferences(e) {
        return this._wrapWhamRequest(() => r.safePatch("/wham/settings/user", {
            requestBody: {
                branch_format: e.branchFormat,
                git_diff_mode: e.diffView,
                custom_instructions: e.customInstructions,
                code_review_preference: e.codeReviewPreference,
                code_review_trigger_policy: e.codeReviewTriggerPolicy,
                alpha_opt_in: e.alphaOptIn,
                allow_credits_for_code_reviews: e.allowCreditsForCodeReviews
            }
        }))
    }
    static getTurns(e) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/tasks/{task_id}/turns", {
            parameters: {
                path: {
                    task_id: e
                }
            }
        }))
    }
    static getTurnLogs(e, t) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/tasks/{task_id}/turns/{task_turn_id}/logs", {
            parameters: {
                path: {
                    task_id: e,
                    task_turn_id: t
                }
            }
        }))
    }
    static async createNewTask(e, t, a, i = !1, n, o = [], _ = []) {
        const u = [{
                type: "message",
                role: "user",
                content: [{
                    content_type: "text",
                    text: a
                }]
            }, ...o, ..._],
            c = await l("codex_create_task_turn").catch(p => {
                m.addError(p)
            }),
            w = g(null, null, null, c);
        return this._wrapWhamRequest(() => r.safePost("/wham/tasks", {
            requestBody: {
                new_task: {
                    environment_id: e,
                    branch: t,
                    run_environment_in_qa_mode: i
                },
                ...n ? {
                    metadata: {
                        best_of_n: n
                    }
                } : {},
                input_items: u
            },
            additionalHeaders: w
        }))
    }
    static async createFixReviewTask(e, t) {
        const a = await l("codex_create_task_turn").catch(n => {
                m.addError(n)
            }),
            i = g(null, null, null, a);
        return this._wrapWhamRequest(async () => {
            const n = {
                review_fix: {
                    task_id: e,
                    turn_id: t
                },
                input_items: []
            };
            return await r.safePost("/wham/tasks", {
                requestBody: n,
                additionalHeaders: i
            })
        })
    }
    static async createNewTaskWithEditedPrompt(e, t, a, i, n = !1) {
        const o = await f.createNewTask(t, a, i, n);
        return f.archiveTask(e).catch(() => {}), o
    }
    static createCodeReviewTask({
        installationId: e,
        repoId: t,
        prNumber: a
    }) {
        return this._wrapWhamRequest(() => r.safePost("/wham/github/installations/{installation_id}/repositories/{repo_id}/pull-request/{pr_number}/task", {
            parameters: {
                path: {
                    installation_id: e,
                    repo_id: t,
                    pr_number: a
                }
            },
            requestBody: {
                action: "review"
            }
        }))
    }
    static createCodeReviewTasksForOpenPullRequests({
        installationId: e,
        repoId: t,
        limit: a = 10
    }) {
        const i = Math.min(Math.max(a ? ? 10, 1), 10);
        return this._wrapWhamRequest(() => r.safePost("/wham/github/installations/{installation_id}/repositories/{repo_id}/pull-requests/review", {
            parameters: {
                path: {
                    installation_id: e,
                    repo_id: t
                }
            },
            requestBody: {
                action: "review",
                limit: i
            }
        }))
    }
    static async createFollowUpTask(e, t, a, i, n = !1, o = 1, _ = []) {
        const u = [{
            type: "message",
            role: "user",
            content: [{
                content_type: "text",
                text: a
            }]
        }, ..._];
        i.forEach(p => {
            u.push({
                type: "comment",
                position: p.position,
                content: p.content
            })
        });
        const c = await l("codex_create_task_turn").catch(p => {
                m.addError(p)
            }),
            w = g(null, null, null, c);
        return this._wrapWhamRequest(() => r.safePost("/wham/tasks", {
            requestBody: {
                follow_up: {
                    task_id: e,
                    turn_id: t,
                    run_environment_in_qa_mode: n
                },
                metadata: {
                    best_of_n: o
                },
                input_items: u
            },
            additionalHeaders: w
        }))
    }
    static async createFollowUpTaskInterrupt(e, t, a, i = []) {
        const n = await l("codex_create_task_turn").catch(_ => {
                m.addError(_)
            }),
            o = g(null, null, null, n);
        return this._wrapWhamRequest(() => r.safePost("/wham/tasks/{task_id}/turns/{task_turn_id}/interrupt", {
            parameters: {
                path: {
                    task_id: e,
                    task_turn_id: t
                }
            },
            requestBody: {
                prompt: a,
                images: i
            },
            additionalHeaders: o
        }))
    }
    static cancelTurnDeprecated(e, t) {
        return this._wrapWhamRequest(() => r.safePost("/wham/tasks/{task_id}/turns/{task_turn_id}/cancel", {
            parameters: {
                path: {
                    task_id: e,
                    task_turn_id: t
                }
            }
        }))
    }
    static cancelTask(e) {
        return this._wrapWhamRequest(() => r.safePost("/wham/tasks/{task_id}/cancel", {
            parameters: {
                path: {
                    task_id: e
                }
            }
        }))
    }
    static markTurnAsRead(e) {
        return this._wrapWhamRequest(() => r.safePost("/wham/tasks/{task_id}/mark_read", {
            parameters: {
                path: {
                    task_id: e
                }
            }
        }))
    }
    static markTurnViewed(e, t) {
        return this._wrapWhamRequest(() => r.safePost("/wham/tasks/{task_id}/turns/{task_turn_id}/viewed", {
            parameters: {
                path: {
                    task_id: e,
                    task_turn_id: t
                }
            }
        }))
    }
    static discardTurn(e, t) {
        return this._wrapWhamRequest(() => r.safePost("/wham/tasks/{task_id}/turns/{task_turn_id}/discard", {
            parameters: {
                path: {
                    task_id: e,
                    task_turn_id: t
                }
            }
        }))
    }
    static undoDiscardedTurns(e, t) {
        return this._wrapWhamRequest(() => r.safePost("/wham/tasks/{task_id}/turns/{task_turn_id}/undo_all_discards_for_siblings", {
            parameters: {
                path: {
                    task_id: e,
                    task_turn_id: t
                }
            }
        }))
    }
    static copyGitApply(e, t, a) {
        return this._wrapWhamRequest(() => r.safePost("/wham/tasks/{task_id}/turns/{task_turn_id}/copy_git_apply", {
            parameters: {
                path: {
                    task_id: e,
                    task_turn_id: t
                }
            },
            requestBody: {
                includes_apply_command: a
            }
        }))
    }
    static forkSharedTask(e) {
        return this._wrapWhamRequest(() => r.safePost("/wham/tasks/{task_id}/fork", {
            parameters: {
                path: {
                    task_id: e
                }
            }
        }))
    }
    static invalidateEnvironmentCache(e) {
        return this._wrapWhamRequest(() => r.safePost("/wham/environments/{environment_id}/reset-cache", {
            parameters: {
                path: {
                    environment_id: e
                }
            }
        }))
    }
    static getDailyCodeReviewMetrics() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/analytics/daily-code-review-metrics", {}))
    }
    static getDailyWorkspaceUsageCounts() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/analytics/daily-workspace-usage-counts", {}))
    }
    static getDailySessionsMessagesCounts({
        includeEmails: e = !1
    } = {}) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/analytics/daily-sessions-messages-counts", {
            parameters: {
                query: {
                    include_emails: e
                }
            }
        }))
    }
    static getDailySkillUsageMetrics() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/analytics/daily-skill-usage-metrics", {}))
    }
    static getUsageLeaderboard({
        windowDays: e,
        page: t,
        pageSize: a,
        clientIds: i,
        sortBy: n,
        sortDirection: o
    }) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/analytics/usage-leaderboard", {
            parameters: {
                query: {
                    window_days: e,
                    page: t,
                    page_size: a,
                    client_ids: i ? [...i] : void 0,
                    sort_by: n,
                    sort_direction: o
                }
            }
        }))
    }
    static getAnalyticsApiReference() {
        return this._wrapWhamRequest(() => r.safeGet("/wham/analytics/api-reference", {}))
    }
    static getApproximateCreditUsage(e) {
        return this._wrapWhamRequest(() => r.safeGet("/wham/usage/approximate-credit-usage", {
            parameters: {
                query: {
                    credit_amount: e
                }
            }
        }))
    }
}

function D(s, e = !1) {
    return s ? .output_items ? .map(t => !e && t.type === "output_diff" ? t.diff : e && t.type === "follow_up_diff" || !e && t.type === "pr" ? t.output_diff.diff : !e && t.type === "cr" ? t.reviewed_diff.diff : !e && t.type === "sr" ? t.reviewed_diff ? .diff ? ? null : null) ? .filter(t => !!t) ? ? []
}

function G(s, e = !1) {
    if (s == null) return "";
    const t = s ? .environment ? .repos ? .[0],
        a = t ? s ? .environment ? .repo_map ? .[t] : null,
        i = a && P(a) ? W(a.git_url) : null,
        n = s ? .branch;
    return s.output_items.filter(o => o.type === "message").flatMap(o => o.content).filter(o => !e || o.content_type === "text").map(o => {
        switch (o.content_type) {
            case "text":
                return o.text;
            case "terminal_chunk_citation":
                return `${h}:${q}[${q}]{line_range_start=${o.line_range_start} line_range_end=${o.line_range_end} terminal_chunk_id=${o.terminal_chunk_id}}${h}`;
            case "repo_file_citation":
                {
                    const d = i ? `${i}/blob/${n}/${o.path}#L${o.line_range_start}-L${o.line_range_end}` : null;
                    return `${h}:${R}[${R}]{line_range_start=${o.line_range_start} line_range_end=${o.line_range_end} path=${o.path}${d?` git_url="${d}"`:""}}${h}`
                }
            case "image_asset_pointer":
                return "";
            case "image_asset_pointer_citation":
                return `${h}:${k}[${k}]{asset_pointer=${o.asset_pointer}}${h}`;
            case void 0:
                return ""
        }
        return ""
    }).join("")
}

function W(s) {
    return s.replace(/\.git$/, "").replace("git://", "https://")
}

function P(s) {
    return s ? .id ? .startsWith("github") || (s ? .git_url ? .indexOf("github.com") ? ? -1) >= 0
}

function v(s) {
    return "output_items" in s
}

function I(s) {
    return "input_items" in s
}

function M(s) {
    return s ? s.input_items ? .flatMap(e => "content" in e ? e ? .content : []) ? .map(e => e.content_type === "text" ? e.text : "") ? .join("") ? ? "" : ""
}

function H(s, e) {
    return s ? v(s) ? G(s, e ? .dropCitations) : M(s) : ""
}

function x(s) {
    return s.type === "cr"
}

function N(s) {
    return s.type === "sr"
}

function $(s) {
    if (!s || !v(s) || !s.output_items) return [];
    const e = [];
    for (const t of s.output_items) {
        if (x(t)) {
            e.push(...t.comments);
            continue
        }
        N(t) && e.push(...t.findings.map(a => a.github_comment))
    }
    return e
}

function F(s, e) {
    return s ? e.filter(t => I(t) && t.previous_turn_id === s.id).flatMap(t => (t.input_items ? ? []).filter(a => a.type === "comment")) : []
}

function z(s) {
    return s ? .turn != null
}

function Q(s) {
    return s.type === "assistant" && s.pull_request_status !== "not_created" && s.pull_request_status !== "failed"
}

function j(s) {
    const e = s.task_status_display ? .latest_turn_status_display;
    return e ? B(e) : !0
}

function A(s) {
    switch (s) {
        case null:
        case void 0:
        case "completed":
        case "failed":
        case "cancelled":
            return !0;
        case "pending":
        case "in_progress":
            return !1;
        default:
            C(s)
    }
}

function B(s) {
    return s ? A(s.turn_status) ? !0 : !!s.cancellation_requested_at : !1
}
export {
    f as W, b as a, T as b, $ as c, B as d, F as e, H as f, D as g, j as h, A as i, I as j, v as k, N as l, x as m, z as n, Q as o, U as w
};
//# sourceMappingURL=cf64444f-b0z8ffdp5xu532do.js.map