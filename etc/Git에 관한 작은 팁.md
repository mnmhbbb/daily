# Git에 관한 작은 팁

### (201217 git과 친해지다가 배운 조각 지식 정리하기)

## interactive rebase

```git
git rebase -i (수정할 커밋의 이전 커밋)
```

인터랙티브 옵션은 수정하고자 하는 커밋의 이전 커밋부터 `interactive`하게 다양한 기능을 넣을 수 있는 옵션이다.

```git
pick (해시코드) (커밋 메세지)

# Rebase 5a323d5..63c8e13 onto 5a323d5 (1 command)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
```

위와 같은 명령어를 선택하여 원하는 기능으로 커밋을 수정할 수 있다.
