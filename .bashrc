# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If running interactively, then:
if [ "$PS1" ]; then

    # don't put duplicate lines in the history. See bash(1) for more options
    # export HISTCONTROL=ignoredups

    # check the window size after each command and, if necessary,
    # update the values of LINES and COLUMNS.
    #shopt -s checkwinsize

    # enable color support of ls and also add handy aliases
    if [ "$TERM" != "dumb" ]; then
    	eval `dircolors -b`
    	alias ls='ls --color=auto'
    	#alias dir='ls --color=auto --format=vertical'
    	#alias vdir='ls --color=auto --format=long'
    fi

    # some more ls aliases
    #alias ls='ls -F'
    alias ll='ls -l'
    alias la='ls -A'
    alias l='ls -CF'

    # sissy rm
    alias rm='rm -i'

    alias devops='ssh -X clolas@devops.inaccess.com'
    alias adevops='ssh pvpms@devops.priv.aes-insolar.com'
#    alias vpn='ssh pvpms@vpnserver.priv.solarpark-online.com'
    alias phoenix='ssh -X clolas@phoenix'
    alias pkgbuild='ssh clolas@pkgbuild'

    # set a fancy prompt
    PS1='\u@\h:\w\$ '

    # If this is an xterm set the title to user@host:dir
    case $TERM in
    xterm*)
        PROMPT_COMMAND='echo -ne "\033]0;${USER}@${HOSTNAME}: ${PWD}\007"'
        ;;
    *)
        ;;
    esac

    # setup dynamic library path for TEL3 project
    AU_LIBPATH=$HOME/wkc/tel3/telhacks:$HOME/wkc/tel3/varhacks
    export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:${AU_LIBPATH}

    # PATH
    PATH=$PATH:$HOME/bin:/opt/inaccess/tools/toolchain/gcc-4.1.2-glibc-2.5/arm-linux-gnueabi/bin/
#    PATH=/opt/inaccess/pvpms/bin:$PATH

    # setup PYTHONPATH

    # import python modules in devel directory
    PYTHONPATH=$PYTHONPATH:/opt/inaccess/pvpms/lib/python
#    PYTHONPATH=/opt/inaccess/pvpms/lib/python:$PYTHONPATH

    export PYTHONPATH 
fi

