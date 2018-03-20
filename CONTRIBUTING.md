# Gamer Matcher API Contributor Guide

Excited about Gamer Matcher and want to make it better? We’re excited too!

Here are some ways to contribute to the project, from easiest to most difficult:

* [Commits](#commits)
* [Reporting bugs](#reporting-bugs)
* [Improving the documentation](#improving-the-documentation)
* [Small bug fixes](#small-bug-fixes)
* [Suggesting features](#suggesting-features)
* [Big pull requests](#big-prs)

## Commits

- Use [conventional commit](https://github.com/pvdlg/conventional-changelog-metahub) on all your commits.

## Issues

### Reporting bugs

If you encounter a bug, please file an issue on GitHub via the repository. If an issue you have is already reported, please add additional information or add a 👍 reaction to indicate your agreement.

While we will try to be as helpful as we can on any issue reported, please include the following to maximize the chances of a quick fix:

1. **Intended outcome:** What you were trying to accomplish when the bug occurred, and as much code as possible related to the source of the problem.
2. **Actual outcome:** A description of what actually happened, including a screenshot or copy-paste of any related error messages, logs, or other output that might be related. Places to look for information include your browser console, server console, and network logs. Please avoid non-specific phrases like “didn’t work” or “broke”.
3. **How to reproduce the issue:** Instructions for how the issue can be reproduced by a maintainer or contributor. Be as specific as possible, and only mention what is necessary to reproduce the bug. If possible, try to isolate the exact circumstances in which the bug occurs and avoid speculation over what the cause might be.

Creating a good reproduction really helps contributors investigate and resolve your issue quickly. In many cases, the act of creating a minimal reproduction illuminates that the source of the bug was somewhere outside the library in question, saving time and effort for everyone.

### Improving the documentation

Improving the documentation can be the easiest way to contribute to the APP. If you see a piece of content that can be better, open a PR with an improvement, no matter how small! If you would like to suggest a big change or major rewrite, we’d love to hear your ideas but please open an issue for discussion before writing the PR.

### Small bug fixes

For a small bug fix change (less than 20 lines of code changed), feel free to open a pull request. We’ll try to merge it as fast as possible.

## Big PRs

This includes:

* Big bug fixes
* New features

1. **Open an issue.** Open an issue about your bug or feature, as described above.
2. **Reach consensus.** Some contributors should reach an agreement that this feature or bug is important, and that someone should work on implementing or fixing it.
3. **Agree on intended behavior.** On the issue, reach an agreement about the desired behavior. In the case of a bug fix, it should be clear what it means for the bug to be fixed, and in the case of a feature, it should be clear what it will be like to do that feature.
4. **Agree on implementation plan.** Write a plan for how this feature or bug fix should be implemented.
5. **Submit PR.** Open a pr with the changes
6. **Review.** At least one core contributor should sign off on the change before it’s merged. Look at the “code review” section below to learn about factors are important in the code review. If you want to expedite the code being merged, try to review your own code first!
7. **Merge and release!**

### Code review guidelines

It’s important that every piece of code is reviewed by at least one core contributor familiar with that codebase. Here are some things we look for:

1. **Required CI checks pass.** This is a prerequisite for the review, and it is the PR author's responsibility. As long as the tests don’t pass, the PR won't get reviewed.
2. **Simplicity.** Is this the simplest way to achieve the intended goal? If there are too many files, redundant functions, or complex lines of code, suggest a simpler way to do the same thing. In particular, avoid implementing an overly general solution when a simple, small, and pragmatic fix will do.
3. **Testing.** Do the tests ensure this code won’t break when other stuff changes around it? When it does break, Did we cover an appropriate set of edge cases? Look at the test coverage report if there is one. Are all significant code paths in the new code exercised at least once? only if we need tests
4. **No unnecessary or unrelated changes.** PRs shouldn’t come with random formatting changes, especially in unrelated parts of the code. If there is some refactoring that needs to be done, it should be in a separate PR from a bug fix or feature, if possible.
5. **Code has appropriate comments.** Code should be commented, or written in a clear “self-documenting” way.
6. **Idiomatic use of the language.** In Javascript, make sure to use const instead of var, etc. Ideally a linter enforces a lot of this, but use your common sense and follow the style of the surrounding code.
