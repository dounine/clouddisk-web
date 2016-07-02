package common.exception;

/**
 * Created by huanghuanlai on 16/4/23.
 */
public class BusinessException extends RuntimeException {
    public BusinessException(String errMsg){
        super(errMsg);
    }
}
