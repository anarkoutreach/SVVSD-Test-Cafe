import os
import subprocess

cwd = os.getcwd()
path =format(cwd)
def runTest(userRoles,userAcLists,nameMod):
    with open(f"{path}\\Tests\\scuffedInfo\\userTypes.json",'w'): pass
    with open(f"{path}\\Tests\\scuffedInfo\\userTypes.json",'w') as file: 
        text ="{\"roles\":"+f"{userRoles}"+",\"aclists\":"+f"{userAcLists}"+"}"
        text = text.replace("'","\"",-1)
        file.write(text)
    with open(f"{path}\\Tests\\scuffedInfo\\config.json",'w'): pass
    with open(f"{path}\\Tests\\scuffedInfo\\config.json",'w') as file: 
        text ="{\"nameMod\":\""+f"{nameMod}"+",\""
        text = text.replace("'","\"",-1)
        file.write(text)
    returncall = subprocess.call(f"testcafe \"chrome '--window-size=800,600'\" {path}\\Tests\\scuffedTests\\actAuthor.ts -e",shell=True)
    if(returncall == 1):
        print("creation of activity author user failed")
    else:
        returncall = subprocess.call(f"testcafe \"chrome '--window-size=800,600'\" {path}\\Tests\\scuffedTests\\useUser.ts -e",shell=True)
        if(returncall == 1):
            print("login of activity user failed failed")
        else:
            print(print("\n\nCreated User And Logged in succsefully"))
            returncall = subprocess.call(f"testcafe \"chrome '--window-size=800,600'\" {path}\\Tests\\activity-tests.ts -e",shell=True)
            if(returncall == 1):
                pass
            else:
                print(print("\n\nCreated User And Logged in and ran activity tests"))

runTest(["viewer","admin","activity author"],[""])
runTest(["viewer","activity author"],[""])
