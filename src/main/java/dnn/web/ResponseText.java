package dnn.web;

/**
 * Created by huanghuanlai on 16/4/1.
 */
public class ResponseText {

    private int errno = 0;
    private boolean success=true;
    private String msg;

    public int getErrno() {
        return errno;
    }

    public void setErrno(int errno) {
        this.errno = errno;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
