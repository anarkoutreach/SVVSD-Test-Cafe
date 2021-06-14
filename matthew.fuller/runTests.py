import os
import subprocess
class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    RESET = '\u001b[0m'
cwd = os.getcwd()
path =format(cwd)
with open(f"{path}\\Tests\\scuffedInfo\\userTypes.json",'w'): pass
with open(f"{path}\\Tests\\scuffedInfo\\userTypes.json",'w') as file: 
    file.write("{\"roles\":[\"viewer\",\"activity author\"],\"aclists\":[]}")
returncall = subprocess.call(f"testcafe \"chrome '--window-size=800,600'\" {path}\\Tests\\scuffedTests\\actAuthor.ts -e",shell=True)
if(returncall == 1):
    print(bcolors.FAIL, "creation of activity author user failed",bcolors.RESET)
else:
    returncall = subprocess.call(f"testcafe \"chrome '--window-size=800,600'\" {path}\\Tests\\scuffedTests\\useUser.ts -e",shell=True)
    if(returncall == 1):
        print(bcolors.FAIL, "login of activity user failed failed",bcolors.RESET)
    else:
        print(print(bcolors.OKBLUE, "\n\n✓ Created User And Logged in succsefully",bcolors.RESET))
        returncall = subprocess.call(f"testcafe \"chrome '--window-size=800,600'\" {path}\\Tests\\activity-tests.ts -e",shell=True)
        if(returncall == 1):
            pass
        else:
            print(print(bcolors.OKBLUE, "\n\n✓Created User And Logged in and ran activity tests",bcolors.RESET))